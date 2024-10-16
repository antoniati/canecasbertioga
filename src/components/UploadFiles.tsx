"use client";

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import React, { useRef, useState } from "react";

import { UploadIcon } from "./Icons";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

interface UploadFilesProps {
    onSuccessUpload: (url: string) => void;
}

interface UploadProgress {
    loaded: number;
    total: number;
}

interface UploadResponse {
    url?: string;
    name: string;
}

export const UploadFiles = ({ onSuccessUpload }: UploadFilesProps) => {
    const IKUploadRef = useRef<HTMLInputElement | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const authenticator = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/upload-images");

            if (!response.ok) {
                throw new Error("Authentication request failed" + response.text());
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };

        } catch (error) {
            throw new Error("Authentication request failed");
        }
    };

    const onError = (err: unknown) => {
        console.error("Error", err);
        setUploadProgress(0);
    };

    const onSuccess = (res: UploadResponse) => {
        setUploadProgress(0);
        if (res.url) {
            onSuccessUpload(res.name);
        }
    };

    const onUploadProgress = (progress: UploadProgress) => {
        const percentCompleted = Math.round((progress.loaded / progress.total) * 100);
        setUploadProgress(percentCompleted);
    };

    const handleUploadClick = () => {
        IKUploadRef.current?.click();
    };

    return (
        <ImageKitProvider>
            <IKUpload
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                style={{ display: "none" }}
                ref={IKUploadRef}
            />
            <button type="button" onClick={handleUploadClick} className='w-auto h-auto flex flex-col space-y-2 hover:bg-slate-200 p-4 items-center justify-center rounded-md border border-slate-400'>
                {uploadProgress > 0 && uploadProgress < 100 ? (
                    <div className="w-full bg-blue-200 rounded-full flex items-center justify-center h-[40px]">
                        <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${uploadProgress}%` }} // Barra de progresso
                        />
                        <span className="text-gray-500">{uploadProgress}%</span>
                    </div>
                ) : (
                    <>
                        <UploadIcon w="24" h="24" />
                        <span className='text-gray-500'>
                            Upload
                        </span>
                    </>
                )}
            </button>
        </ImageKitProvider>
    );
};
