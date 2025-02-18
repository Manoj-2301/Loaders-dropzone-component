'use client'
import { useForm } from 'react-hook-form';
import './style.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Form from '../../Component/Form/Form';
import ImageUploader from '../../Component/ImageUploader/ImageUploader';
import Button from '../../Component/button/index'
import { useCallback, useEffect, useState } from 'react';
const application = () => {
    const formValidation = Yup.object({
        email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email is required.'),
        file: Yup.string().required("file is required"),
    })
    const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(formValidation), });

    const [files, setFiles] = useState([]);
    const [reject, setReject] = useState([])
    const [loading, setLoading] = useState({})

    let idCounter = 0;

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const dropFile = acceptedFiles.map(file => {
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
                id: idCounter++
            });
        });
        setFiles(Files => [...Files, ...dropFile]);
        setReject(rejectedFiles)

        dropFile.forEach((file) => {
            setLoading((load) => ({
                ...load,
                [file.id]: true,
            }));
        });

        dropFile.forEach((file) => {
            setTimeout(() => {
                setLoading((load) => ({
                    ...load,
                    [file.id]: false,
                }));
            }, 1000);
            console.log(file)
            return;
        });
        // console.log(acceptedFiles)
    }, [])

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleRemoveFile = (remove) => {
        setFiles(files.filter((file) => file.id !== remove.id));
        URL.revokeObjectURL(remove.preview);
        console.log(remove, 'deleted')
    };

    const onSubmit = (data) => {
        const formDataWithFiles = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          files: files, 
        };    
        console.log("Form data with img card:", formDataWithFiles);  
        reset();
        setFiles([])
      };
    return (
        <div className='application'>
            input with pdf upload
            <form onSubmit={handleSubmit(onSubmit)} className='form' >
                <Form
                    name="name"
                    control={control}
                    type="name"
                  autoComplete={'on'}
                    Style={{
                        form_field: "form_field",
                        label: "label",
                        input: 'input',
                        error_message: "error",
                        icon: "icon",
                        input_wrapper: "wrapper",
                        input_wrapper_icon: "wrapper-icon",
                        labelicon: "label_icon",
                        error_message: "error_message"
                    }}
                />
                <Form
                    name="email"
                    control={control}
                    type="email"
                    autoComplete={'on'}
                    Style={{
                        form_field: "form_field",
                        label: "label",
                        input: 'input',
                        error_message: "error",
                        icon: "icon",
                        input_wrapper: "wrapper",
                        input_wrapper_icon: "wrapper-icon",
                        labelicon: "label_icon",
                        error_message: "error_message"
                    }}
                />
                <Form
                    name="phone"
                    control={control}
                    type="number"
                    autoComplete={'on'}
                    Style={{
                        form_field: "form_field",
                        label: "label",
                        input: 'input',
                        error_message: "error",
                        icon: "icon",
                        input_wrapper: "wrapper",
                        input_wrapper_icon: "wrapper-icon",
                        labelicon: "label_icon",
                        error_message: "error_message"
                    }}
                />
                <div>
                    <ImageUploader
                        name="file"
                        type={'file'}
                        control={control}
                        dropActiveText={"Drop here"}
                        dropHeading={"Upload your Resume/CV"}
                        dropText={" size upto 5MB"}
                        onDropFiles={onDrop}
                        // maxSize={5 * 1024 *1024}
                        width={50}
                        height={50}
                        iconType={<i className="fi fi-rr-cloud-upload-alt"></i>}
                        rejectedIcon={<i className="fi fi-rr-face-sad-sweat"></i>}
                        onClick={handleRemoveFile}
                        loading={loading}
                        reject={reject}                        
                        files={files}
                        label={"Cv or Resume"}
                        acceptedFileTypes={{ 'image/pdf': ['.pdf'] }}
                        // download={handleClick}
                        Style={{
                            Container: 'container',
                            uploaderbox: "uploaderbox",
                            loader: "loader",
                            label: "label",
                            drop_title: "drop_title",
                            iconType: "iconType",
                            drop_sub_em:"drop_sub_em",
                            // after drop 
                            accepted_list: "accepted_list",
                            accept_file: "accept_file",
                            upload: "upload",
                            image: "image",
                            iconBorder: "iconBorder",
                            remove: "remove",
                            error_message: "error_message",
                            rejected_error:"rejected_error",
                        }}
                    />

                </div>
                <Button
                    text={"Submit"}
                    type={"submit"}
                    style={{
                        tb_button: "button"
                    }} />
            </form>
        </div>
    )
}

export default application