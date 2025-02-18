'use client'
import { useForm } from 'react-hook-form';
import './Style.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Form from '../../Component/Form/Form';
import OnlyImage from "../../Component2/onlyImage"
import Button from '../../Component/button/index'
import { useCallback, useEffect, useState } from 'react';
const task = () => {
  const formValidation = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    file: Yup.string().required("file is required"),
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
      name: data.name,
      email: data.email,
      phone: data.phone,
      files: files, 
    };    
    console.log("Form data with files:", formDataWithFiles);  
    reset();
    setFiles([])
  };
  
  return (
    <div className='task'>
      input with img preview
      <form onSubmit={handleSubmit(onSubmit)} className='forms'autoComplete='on' >
        <Form
          name="name"
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
          }}
        />
        <Form
          name="email"
          control={control}
          type="email"
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
          }}
        />
        <Form
          name="phone"
          control={control}
          type="number"
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
          }}
        />
        <div>
          <OnlyImage
            name="file"
            type={'file'}
            control={control}
            files={files}
            reject={reject}
            dropHeading={"Drop/Drag here"}
            dropActiveText={"Drop Here"}
            onDropFiles={onDrop}
            width={70}
            height={70}
            loading={loading}
            // maxSize={1 *1024 *1024}
            Style={{
              Container: "Container",
              uploaderbox: "box_conatiner",
              image_list: "image_list",
              side_by_side: "side_by_side",
              image_accepted: "image_accepted"
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