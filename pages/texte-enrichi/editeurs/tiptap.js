import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
    const toolName = "Tiptap";

    const supportMarkdown = true;
    const useTextarea = true;

    const docLink = "https://tiptap.dev/docs";

    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World! 🌎️</p>",
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    });

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

            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
