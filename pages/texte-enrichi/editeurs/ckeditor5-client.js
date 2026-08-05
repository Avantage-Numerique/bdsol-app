import dynamic from "next/dynamic";

const Ckeditor5ClientSide = dynamic(() => import("./ckeditor5"), { ssr: false });

export default Ckeditor5ClientSide;
