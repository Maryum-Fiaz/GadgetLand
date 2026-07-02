import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { UploadCloud, X, Trash2 } from "lucide-react";

import { MetaData } from "../../components/index";
import { useNavigate, useParams } from "react-router";
import {
  useDeleteImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productApi";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // RTK Query
  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      setImagesPreview([]);
      setImages([]);
      toast.success("Images Uploaded successfully");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, deleteError, navigate]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return toast.error("Please select at least one image to upload.");
    }
    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };

  return (
    <>
      <MetaData title={"Upload Product Images"} />

      <div className="w-full max-w-3xl mx-auto px-4 py-6 font-sans">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Header */}
          <div className="pb-4 border-b border-zinc-100">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Upload Product Images
            </h2>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="customFile"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500"
            >
              Choose Images
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-zinc-200 hover:border-mauve-400 rounded-xl bg-zinc-50/50 hover:bg-white transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center space-y-1 text-center p-4">
                <UploadCloud className="w-7 h-7 text-zinc-400" />
                <p className="text-xs font-medium text-zinc-600">
                  Click to select product images
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="product_images"
                className="hidden"
                id="customFile"
                multiple
                onChange={onChange}
                onClick={handleResetFileInput}
              />
            </div>
          </div>

          {/* Previews */}
          {imagesPreview?.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                New Images Previews:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imagesPreview.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl border border-zinc-200 bg-white p-2 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={img}
                        alt="Preview img"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImagePreviewDelete(img);
                      }}
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-zinc-800 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stored Images */}
          {uploadedImages?.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Product Uploaded Images (Live):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {uploadedImages.map((img, index) => (
                  <div
                    key={img?.public_id || index}
                    className="relative aspect-square rounded-xl border border-zinc-200 bg-white p-2 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={img?.url}
                        alt="Product Live Node asset"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={isLoading || isDeleteLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(img?.public_id);
                      }}
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || isDeleteLoading}
              className="w-full sm:w-40 h-11 bg-mauve-500 hover:bg-mauve-600 disabled:bg-zinc-300 text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadImages;
