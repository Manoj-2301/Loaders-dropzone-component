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
    width, height, type,
    files= [],
    icon,
    iconType,
    Cancel,
    reject= [],
    message="file is not supported"
}) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        onDrop: onDropFiles,
        maxSize,
        maxFiles,
        accept: acceptedFileTypes,
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                // console.log(field)
                return (
                    <div className={`${Style.Container}`}>
                        <div {...getRootProps()} className={`${Style.uploaderbox}`}{...field}>
                            <input {...getInputProps()} type={type} />
                            {loading ? (
                                <div className='loading'>
                                    <span className={`${Style.loader}`}></span>
                                    <p className={`${Style.upload}`}>Uploading file...</p>
                                    <p className={`${Style.cancelBtn}`}>
                                        {Cancel}
                                    </p>
                                </div>
                            ) : isDragAccept ? (
                                <div className={`${Style.drop}`}>
                                    <span>{icon}</span>
                                    <p>{dropActiveText}</p>
                                </div>
                            ) : (
                                <div className={`${Style.drop_title}`}>
                                    {iconType && (<span>{iconType}</span>)}
                                    <p className={`${Style.drop_sub}`}>{dropHeading}</p>
                                    <p className={`${Style.drop_sub_em}`}>{dropText}</p>
                                </div>
                            )}
                        </div>
                        <ul className={`${Style.image_list}`} style={{display:"flex", gap:"10px"}}>
                            {files.map(file => (
                                <li key={file.id} className={`${Style.side_by_side}`}>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                        width={width}
                                        height={height}
                                        className={`${Style.image_accepted}`}
                                       
                                    />                                    
                                </li>
                            ))}
                        </ul>

                        <ul className={`${Style.reject_file}`} >
                            {reject.map(({ file, errors }) => (
                                <li key={file.path} className={`${Style.error_list}`}>
                                    {/* {file.name}                                    */}
                                    <ul className={`${Style.error_message}`}>
                                        {errors.map(e => <li key={e.code} className={`${Style.error_msg}`}>{message}</li>)}
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