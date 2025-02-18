'use client'
import { useForm } from 'react-hook-form';
import './ThirdType.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Form from '../../Component/Form/Form';
import Button from '../../Component/button/index'
import { useCallback, useEffect, useState } from 'react';
import SideBySide from '@/app/component3/SideImage';

const task = () => {
    const formValidation = Yup.object({
        file: Yup.string().required("file is required"),
        gallery:Yup.string().required("Need to enter Name ")
    })
    const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(formValidation), });

    const [files, setFiles] = useState([]);
    const [reject, setReject] = useState([])
    const [loading, setLoading] = useState(false)

    let uniqueIdCounter = 0;

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setLoading(true)
        const updatedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uniqueIdCounter++
        }));
        console.log('first', updatedFiles)
        setTimeout(() => {
            setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
            setLoading(false)
            setReject(rejectedFiles)
        }, 2000);
        console.log(acceptedFiles)
    }, [])

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    const onSubmit = (data) => {
        const formDataWithFiles = {
            galary: data.galary,
            files: files,
        };
        console.log("Form data with files:", formDataWithFiles);
        reset();
        setFiles([])
    };

    const Delete = (fileToRemove) => {
        setFiles(files.filter((file) => file.id !== fileToRemove.id));
        console.log(fileToRemove, "deleted")
    };

    return (
        <div className='imageside'>
            input with image side of uploader
            <form onSubmit={handleSubmit(onSubmit)} className=' forme' autoComplete='off' >

                <Form
                    name="gallery"
                    control={control}
                    type="name"
                    autoComplete={'off'}
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
                    }} />
                <div>
                    <SideBySide
                        name="file"
                        type={'file'}
                        control={control}
                        // maxSize={1 * 1024 * 1024}
                        maxFiles={3}
                        wrong={Delete}
                        onDropFiles={onDrop}
                        width={200}
                        height={200}
                        icon={<i className="fi fi-br-plus"></i>}
                        loading={loading}
                        reject={reject}
                        error_message={"Upload up to 3 img"}
                        files={files}
                        wrongIcon={<i className="fi fi-br-cross-small"></i>}
                        Style={{
                            container: "main_box",
                            uploaderbox: "uploaderbox",
                            loader: "loaders",
                            reject_file: "reject",
                            error_list: 'error_list',
                            error_message: 'error_message',
                            accepted_list: "acccepted_list",
                            image_accepted: "image_accepted",
                            side_by_side: "side",
                            wrong: "wrong"
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

export default task