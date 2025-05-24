import Link from '@mui/material/Link';
export default function Footer(){
    return (
        <footer className=" w-full bg-gray-200 bottom-0 fixed h-16 flex justify-center flex-col items-center">
            <div className=" text-gray-500" >2025 &copy; All rights reserved by Bret R</div>
            <Link href="https://github.com/BretRen/todo/issues/new/choose" target="_blank">Report a Problem or feedback</Link>
        </footer>
    )
}