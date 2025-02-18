'use client'
import React from 'react';
import { Controller } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const Preview = ({
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
    iconType,
    reject, iconDownload, iconRemove,
    onClick,
    rejectedIcon,
    download,
    downloadText,
    label, labelIcon
}) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDrop: onDropFiles,
        maxSize,
        maxFiles,
        accept: acceptedFileTypes,
    });

    const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                // console.log(field)
                // console.log(files)
                return (
                    <div className={`${Style.Container}`}>
                        {label && (
                            <label className={`${Style.label}`}>
                                {labelIcon && (<span className={` ${Style.labelicon}`}>{labelIcon}</span>)}
                                {label}</label>
                        )}
                        <div {...getRootProps()} className={`${Style.uploaderbox}`} {...field}>
                            <input {...getInputProps()} type={type} />
                            {isDragAccept ? (
                                <div className={`${Style.drop}`}>
                                    <span>{icon}</span>
                                    <p>{dropActiveText}</p>
                                </div>
                            ) : (
                                <div className={`${Style.drop_title}`}>
                                    {iconType && (<span className={`${Style.iconType}`}>{iconType}</span>)}
                                    <p className={`${Style.drop_sub}`}>{dropHeading}</p>
                                    <p className={`${Style.drop_sub_em}`}>{dropText}</p>
                                </div>
                            )}
                        </div>
                        {/* accepted image list */}
                        <ul className={`${Style.accepted_list}`}>
                            {files.map((file) => (
                                <li key={file.id} className={`${Style.accept_file}`}>
                                    <div className={`${Style.upload}`}>
                                        <Image className={`${Style.image}`}
                                            src={file.preview}
                                            alt={file.name}
                                            onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                            width={width}
                                            height={height}
                                        />
                                        <div className={`${Style.uploading_file}`}>
                                            {file.name}
                                            {loading[file.id] ? (<span className={`${Style.loader}`}></span>) : (<p style={{ color: "green" }}>File Size Is {bytesToMB(file.size)} MB</p>)}
                                        </div>
                                    </div>

                                    <div className={`${Style.option}`}>
                                        <p className={`${iconDownload ? `${Style.iconBorder}` : Style.download}`} onClick={() => download(file)} style={{ cursor: "pointer" }}>
                                            {iconDownload ? (<span>{iconDownload}</span>) : (<span>{downloadText}</span>)}
                                        </p>
                                        <p className={`${iconRemove ? `${Style.iconBorder}` : Style.remove}`} onClick={() => onClick(file)} style={{ cursor: "pointer" }}>
                                            {iconRemove ? (<span>{iconRemove}</span>) : (<span>Remove</span>)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* rejected image list */}
                        <ul className={`${Style.reject_file}`} >
                            {reject.map(({ file, errors }) => (
                                <li key={file.path} className={`${Style.error_list}`} style={{listStyle:"none"}}>
                                    <div className={`${Style.sad}`}>
                                        <span className={`${Style.rejected_sad}`}>{rejectedIcon} </span>
                                        {file.name}
                                    </div>
                                    <ul className={`${Style.error_message}`}>
                                        {errors.map(e => <li key={e.code} className={`${Style.rejected_error}`} >Size is More than 1MB</li>)}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        {error && <span className={`${Style.error_message}`}>{error.message}</span>}
                    </div>
                );
            }}
        />
    );
}

export default Preview;