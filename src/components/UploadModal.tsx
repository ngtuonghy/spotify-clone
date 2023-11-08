"use client";
import React, { useState } from "react";
import uniqid from "uniqid";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useFilePreview from "@/hooks/useFilePreview";
import { BsImage } from "react-icons/bs";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const { register, handleSubmit, reset, watch } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      const lyricFile = values.lyric?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing field");
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { data: lyricData, error: lyricError } =
        await supabaseClient.storage
          .from("lyrics")
          .upload(`lyric-${values.title}-${uniqueID}`, lyricFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (lyricError) {
        setIsLoading(false);
        return toast.error("Failed lyric upload");
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
          lyric_path: lyricData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Create!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Some thing went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const file = watch("image");
  let [filePreview] = useFilePreview(file);
  if (!file) filePreview = null;
  return (
    <Modal
      title="Upload a song"
      // description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-y-4 gap-5 justify-between h-full"
      >
        <div className="flex flex-col gap-3 items-center">
          <p className="text-xs font-serif">
            <span className="text-blue-600">Drop</span> or{" "}
            <span className="text-blue-600">Click</span> Below your upload image
          </p>
          <div className="h-full">
            <div className="w-60 h-60 border rounded-lg border-dashed border-white flex flex-col justify-center items-center relative">
              {typeof filePreview === "string" ? (
                <div className="w-60 h-60 border rounded-lg border-dashed border-white">
                  <img
                    src={filePreview}
                    alt="preview"
                    className="w-full h-full p-1 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <BsImage className="w-56 h-56 text-neutral-400" />
              )}
              <Input
                id="image"
                disabled={isLoading}
                type="file"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: "0",
                  top: "0",
                  left: "0",
                }}
                accept="image/*"
                {...register("image", { required: true })}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mb-1">
            <Input
              id="title"
              disabled={isLoading}
              {...register("title", { required: true })}
              placeholder="Song title"
            />
          </div>
          <Input
            id="author"
            disabled={isLoading}
            {...register("author", { required: true })}
            placeholder="Song author"
          />
          <div className="pb-1">
            <p>Select a song file</p>
            <Input
              id="song"
              disabled={isLoading}
              type="file"
              accept=".mp3"
              {...register("song", { required: true })}
            />
          </div>
          <div className="pb-1">
            <p>Select a lyric file</p>
            <Input
              id="lyric"
              disabled={isLoading}
              type="file"
              accept=".lrc"
              {...register("lyric", { required: false })}
            />
          </div>

          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
