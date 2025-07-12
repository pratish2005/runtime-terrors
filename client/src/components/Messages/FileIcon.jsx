import React from "react";
import {
    FilePlus,
    FileSearch,
    FileText,
    FileX,
    FileAudio,
    FileCloud,
    FileCode,
    FileCss,
    FileCsv,
    FileDoc,
    FileHtml,
    FileImage,
    FileJpg,
    FileJs,
    FileJsx,
    FileLock,
    FilePng,
    FilePpt,
    FileRs,
    FileTs,
    FileTsx,
    FileVideo,
    FileVue,
    FileXls,
    FileZip,
    Files,
    FilePdf,
} from "phosphor-react";

const FileIcon = ({ file_name }) => {
    const extension = file_name.split(".").pop().toLowerCase();
    
    const iconMap = {
        plus: FilePlus,
        search: FileSearch,
        text: FileText,
        x: FileX,
        audio: FileAudio,
        cloud: FileCloud,
        code: FileCode,
        css: FileCss,
        csv: FileCsv,
        doc: FileDoc,
        html: FileHtml,
        image: FileImage,
        jpg: FileJpg,
        js: FileJs,
        jsx: FileJsx,
        lock: FileLock,
        png: FilePng,
        ppt: FilePpt,
        rs: FileRs,
        ts: FileTs,
        tsx: FileTsx,
        video: FileVideo,
        vue: FileVue,
        xls: FileXls,
        zip: FileZip,
        pdf: FilePdf,
    };

    const IconComponent = iconMap[extension] || Files; 

    return <IconComponent size={20} />;
};

export default FileIcon;
