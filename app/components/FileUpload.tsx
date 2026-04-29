"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";


interface FileUploadProps {
  onSuccess:(res:any) => void;
  onError:(error:any) => void;
  onProgress:(progress:number) => void;
  fileType?: string[];
}
// FileUpload component demonstrates file uploading using ImageKit's Next.js SDK.

const FileUpload = (props: FileUploadProps) => {
    const fileType = props.fileType ?? ["image/", "video/"];
    const acceptedFileTypes = fileType
        .map((type) => (type.endsWith("/") ? `${type}*` : type))
        .join(",");

    const [progress, setProgress] = useState(0);

    
    const fileInputRef = useRef<HTMLInputElement>(null);

   
    const abortController = new AbortController();

    
    // const authenticator = async () => {
    //     try {

    //         const response = await fetch("/api/upload-auth");
    //         if (!response.ok) {
               
    //             const errorText = await response.text();
    //             throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    //         }

            
    //         const data = await response.json();
    //         const { signature, expire, token, publicKey } = data;
    //         return { signature, expire, token, publicKey };
    //     } catch (error) {
    //         // Log the original error for debugging before rethrowing a new error.
    //         console.error("Authentication error:", error);
    //         throw new Error("Authentication request failed");
    //     }
    // };

    
    // const handleUpload = async () => {
        
    //     const fileInput = fileInputRef.current;
    //     if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    //         alert("Please select a file to upload");
    //         return;
    //     }

        
    //     const file = fileInput.files[0];

        
    //     let authParams;
    //     try {
    //         authParams = await authenticator();
    //     } catch (authError) {
    //         console.error("Failed to authenticate for upload:", authError);
    //         return;
    //     }
    //     const { signature, expire, token, publicKey } = authParams;

       
    //     try {
    //         const uploadResponse = await upload({
                
    //             expire,
    //             token,
    //             signature,
    //             publicKey,
    //             file,
    //             fileName: file.name, 
    //             onProgress: (event) => {
    //                 setProgress((event.loaded / event.total) * 100);
    //             },
                
    //             abortSignal: abortController.signal,
    //         });
    //         console.log("Upload response:", uploadResponse);
    //     } catch (error) {
            
    //         if (error instanceof ImageKitAbortError) {
    //             console.error("Upload aborted:", error.reason);
    //         } else if (error instanceof ImageKitInvalidRequestError) {
    //             console.error("Invalid request:", error.message);
    //         } else if (error instanceof ImageKitUploadNetworkError) {
    //             console.error("Network error:", error.message);
    //         } else if (error instanceof ImageKitServerError) {
    //             console.error("Server error:", error.message);
    //         } else {
                
    //             console.error("Upload error:", error);
    //         }
    //     }
    // };

    const [uploading, setUploading] = useState(false);
    const [error,seterror] = useState<string | null>(null);

    const validateFile = (file: File) => {
        const fileTypeAllowed = fileType.some((allowedType) =>
            file.type.startsWith(allowedType),
        );

        if (!fileTypeAllowed) {
            seterror("Unsupported file type. Please upload a JPEG, PNG, or MP4 file.");
            return false;
        }

        if (file.size > 100 * 1024 * 1024) {
            seterror("File size exceeds the 100MB limit. Please upload a smaller file.");
            return false;
        }

        return true;
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        seterror(null);

        const file = event.target.files?.[0];

        if (!file || !validateFile(file)) {
            return;
        }

        setUploading(true);

          try {
          const authRes=  await fetch("/api/auth/imageki-auth")
          const auth = await authRes.json();
            const { signature, expire, token } = auth;
            
          const uploadRes =await upload({
               
                file,
                fileName: file.name, 
                publicKey : process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                expire,
                token,
                signature,

                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });

          console.log("Upload response:", uploadRes);
          props.onSuccess(uploadRes);
        } catch (error) {
            console.error("Upload error:", error);

            props.onError(error);

        } finally {
            setUploading(false);
        }
    };

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
           
        <input
            type="file"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            ref={fileInputRef}
        />

           {uploading && <p>Uploading...</p>}
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="button" onClick={handleUpload}>
                Upload file
            </button>
            <br />
           
            Upload progress: <progress value={progress} max={100}></progress>
        </>
    );
};

export default FileUpload;