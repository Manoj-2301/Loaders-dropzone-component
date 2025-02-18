import  Application from './(Task)/Application/application';
import Task from "./(Task)/Task2/task";
import ImageSide from "./(Task)/Task3/ImageSide";
import Style from './page.module.css'
export default function Home() {
  return (
    <div className={Style.contain}>
      <Application/> 
      <Task/>
      <ImageSide/>
    </div>
  );
}
