"use client";

import { IKImage } from "imagekitio-next";
import Props from "imagekitio-next/dist/types/components/IKImage/props";
import { ImageProps } from "next/image";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export const Image = (props: Omit<ImageProps, "src" | "loading" | "loader"> & Props & Props): JSX.Element => {
    return (
        <IKImage urlEndpoint={urlEndpoint} {...props} />
    );
};