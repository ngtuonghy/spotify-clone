import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useEditModal from "@/hooks/useEditUpModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "./Button";
import useGetSongById from "@/hooks/useGetSongById";
import useFilePreview from "@/hooks/useFilePreview";
import useLoadImage from "@/hooks/useLoadImage";
import { BsImage } from "react-icons/bs";
import useEditSongId from "@/providers/useEditSong";
import uniqid from "uniqid";
import { deleteSongById } from "@/actions/deleteSongsById";
import { useConfirmStore } from "@/hooks/useComfirm";
const EditModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storeEditSong = useEditSongId();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { isConfirmVisible, showConfirm, hideConfirm, onConfirm } =
    useConfirmStore();
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<FieldValues>({
      defaultValues: {
        author: "",
        title: "",
        song: null,
        image: null,
      },
    });
  const getDataEdit = useGetSongById(`${storeEditSong.editSong}`);
  // console.log(getDataEdit);
  const dataEdit = getDataEdit;
  useEffect(() => {
    const editData = async () => {
      setValue("author", dataEdit.song?.author);
      setValue("title", dataEdit.song?.title);
    };
    editData();
  });

  const handleConfirmClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (onConfirm) {
      onConfirm();
    }
  };
  const handleDelete = () => {
    editModal.onClose();
    showConfirm(() => {
      if (dataEdit.song?.id) {
        deleteSongById(
          supabaseClient,
          storeEditSong.editSong,
          dataEdit.song?.song_path,
          dataEdit.song?.image_path,
          dataEdit.song?.lyric_path,
        );
        router.refresh();
      }
      hideConfirm();
    });
  };

  const editModal = useEditModal();
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editModal.onClose();
    }
  };
  console.log("check render");
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const updateData: {
        title: string;
        author: string;
        song_path?: any;
        image_path?: any;
        lyric_path?: any;
      } = {
        title: values.title,
        author: values.author,
      };
      const uniqueID = uniqid();
      const songFile = values.song?.[0];
      if (songFile) {
        if (dataEdit.song?.song_path) {
          const { error: removeSongError } = await supabaseClient.storage
            .from("songs")
            .remove([dataEdit.song?.song_path]);
          if (removeSongError) {
            setIsLoading(false);
            return toast.error("Failed song upload");
          }
        }
        const { data: songData, error: songError } =
          await supabaseClient.storage
            .from("songs")
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
              cacheControl: "3600",
              upsert: false,
            });
        updateData.song_path = songData?.path;
        if (songError) {
          setIsLoading(false);
          return toast.error("Failed remove song");
        }
      }

      const imageFile = values.image?.[0];
      if (imageFile) {
        if (dataEdit.song?.image_path) {
          const { error: removeImageError } = await supabaseClient.storage
            .from("images")
            .remove([dataEdit.song?.image_path]);
          if (removeImageError) {
            setIsLoading(false);
            return toast.error("Failed remove song");
          }
        }
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });
        updateData.image_path = imageData?.path;
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed remove image");
        }
      }
      const lyricFile = values.lyric?.[0];
      if (lyricFile) {
        if (dataEdit.song?.lyric_path) {
          const { error: removeLyricError } = await supabaseClient.storage
            .from("lyrics")
            .remove([dataEdit.song?.lyric_path]);
          if (removeLyricError) {
            setIsLoading(false);
            return toast.error("Failed remove song file");
          }
        }
        const { data: lyricData, error: lyricError } =
          await supabaseClient.storage
            .from("lyrics")
            .upload(`lyric-${values.title}-${uniqueID}`, lyricFile, {
              cacheControl: "3600",
              upsert: false,
            });
        updateData.lyric_path = lyricData?.path;
        if (lyricError) {
          setIsLoading(false);
          return toast.error("Failed remove lyric file");
        }
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .update(updateData)
        .eq("id", storeEditSong.editSong);
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Edited!");
      reset();
      editModal.onClose();
      console.log(values.title);
    } catch (error) {
      toast.error("Some thing went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  let getImageUrl;
  if (getDataEdit) {
    if (getDataEdit.song) {
      const getImage = useLoadImage(getDataEdit.song);
      getImageUrl = getImage;
    }
  }
  const file = watch("image");
  let [filePreview] = useFilePreview(file);
  if (!file) {
    if (getImageUrl) filePreview = getImageUrl;
  }

  return (
    <div>
      <Modal
        title="Edit a song"
        // description="Edit"
        isOpen={editModal.isOpen}
        onChange={onChange}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row gap-y-4 gap-5 justify-between items-center h-full"
        >
          <div className="flex flex-col gap-3 items-center">
            <p className="text-xs font-serif">
              <span className="text-blue-600">Drop</span> or{" "}
              <span className="text-blue-600">Click</span> Below your upload
              image
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
                  {...register("image", { required: false })}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Input
                id="title"
                disabled={isLoading}
                {...register("title", { required: false })}
                placeholder="Song title"
              />
            </div>
            <Input
              id="author"
              disabled={isLoading}
              {...register("author", { required: false })}
              placeholder="Song author"
            />
            <div className="pb-1">
              <div>Select a song file</div>
              <Input
                id="song"
                disabled={isLoading}
                type="file"
                accept=".mp3"
                {...register("song", { required: false })}
              />
            </div>
            <div className="pb-1">
              <div>Select a lyric file</div>
              <Input
                id="lyric"
                disabled={isLoading}
                type="file"
                accept=".lrc"
                {...register("lyric", { required: false })}
              />
            </div>
            <div className="flex gap-5">
              <Button onClick={handleDelete} className="bg-red-400">
                Delete
              </Button>
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      {isConfirmVisible && (
        <div
          onClick={hideConfirm}
          className="bg-neutral-900/60 w-full h-full backdrop-blur fixed z-50 inset-0 flex justify-center items-center"
        >
          <div className="absolute mx-auto bg-white p-10 rounded-lg w-[420px] h-[215px] flex flex-col justify-between">
            <p className="text-2xl text-black font-bold">
              Are you sure delete song{" "}
              <span className="text-red-500">"{dataEdit.song?.title}"</span>?
            </p>
            <div className="flex justify-end gap-7">
              <Button className="bg-white px-5 w-fit" onClick={hideConfirm}>
                Cancel
              </Button>
              <Button className="px-5 w-fit" onClick={handleConfirmClick}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
