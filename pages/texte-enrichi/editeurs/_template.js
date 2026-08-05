// import ...

const __Editor = () => {
    const toolName = "__Editor";

    const supportMarkdown = true;
    const useTextarea = true;

    const docLink = "https://_editor/docs";

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

            {/* <Editor /> */}
        </div>
    );
};

export default Tiptap;
