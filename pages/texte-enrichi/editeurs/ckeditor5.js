import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const Ckeditor5 = () => {
    const toolName = "Ckeditor5";

    const supportMarkdown = true;
    const useTextarea = true;

    const docLink = "https://ckeditor.com/docs/ckeditor5/latest/index.html";

    return (
        <div>
            <h3>{toolName}</h3>

            <p>
                <a href={docLink}>Documentation</a>
            </p>

            <table>
                <tbody>
                    <tr>
                        <td>Markdown</td>
                        <td>{supportMarkdown ? "✅" : "⛔"}</td>
                    </tr>

                    <tr>
                        <td>
                            Utilise <code>&lt;textarea&gt;</code>
                        </td>
                        <td>{useTextarea ? "✅" : "⛔"}</td>
                    </tr>
                </tbody>
            </table>

            <h4>Éditeur :</h4>

            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: "GPL",

                    plugins: [Essentials, Paragraph, Bold, Italic],

                    toolbar: ["undo", "redo", "|", "bold", "italic", "|"],

                    root: {
                        initialData: "<p>Hello from CKEditor 5 in Next.js!</p>",
                    },
                }}
            />
        </div>
    );
};

export default Ckeditor5;
