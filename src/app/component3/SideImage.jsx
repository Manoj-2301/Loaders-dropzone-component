'use client'
import React from 'react';
import { Controller } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const SideBySide = ({
    name,
    control,
    onDropFiles,
    maxSize,
    acceptedFileTypes,
    dropText,
    dropActiveText,
    dropHeading,
    loading,
    Style, maxFiles,
    width, height, type, files,
    icon,
    Cancel,
    wrongIcon,
    reject,
    error_message,
    wrong,
}) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDrop: onDropFiles,
        maxSize,
        maxFiles,
        accept: acceptedFileTypes,
        // noDrag:true
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className={`${Style.container}`}>
                        {/* Uploaded Images */}
                        {files && (<ul className={`${Style.accepted_list}`}>
                            {files.map(file => (
                                <li key={file.id} className={`'${Style.side_by_side}`} style={{ position: "relative" }}>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                        width={width}
                                        height={height}
                                        className={`${Style.image_accepted}`}
                                    />
                                    <div className={`${Style.wrong}`} onClick={() => wrong(file)} style={{ cursor: "pointer", }}>{wrongIcon}</div>
                                </li>
                            ))}
                        </ul>)}
                        {/* Drag and Drop Area */}
                        <div>
                            <div {...getRootProps()} className={`${Style.uploaderbox}`} {...field} >
                                <input {...getInputProps()} type={type} />
                                {loading ? (
                                    <div className='loading'>
                                        <span className={`${Style.loader}`}></span>
                                        <p className={`${Style.upload}`}></p>
                                        <p className={`${Style.cancelBtn}`}>{Cancel}</p>
                                    </div>
                                ) : isDragAccept ? (
                                    <div className={`${Style.drop}`} >
                                        <span>{icon}</span>
                                        <p>{dropActiveText}</p>
                                    </div>
                                ) : (
                                    <div className={`${Style.drop_title}`}>
                                        <span>{icon}</span>
                                        <p className={`${Style.drop_sub}`}>{dropHeading}</p>
                                        <p className={`${Style.drop_sub_em}`}>{dropText}</p>
                                    </div>
                                )}
                            </div>

                            {error && <span className={`${Style.error_message}`}>{error.message}</span>}

                            {
                                reject.length > 0 && (
                                    <li className={`${Style.error_list}`} style={{ listStyle: "none" }}>
                                        <ul className={`${Style.error_message}`}>
                                            <li className={`${Style.rejected_error}`} >
                                               {error_message}
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }


                        </div>
                    </div>
                );
            }}
        />
    );
}

export default SideBySide;
