import { useState } from "react";

function Folder({ explorer, handelInsertNode }) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    });

    const handleFolder = (e, isFolder) => {
        e.stopPropagation();
        ///
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        });
    };

    const onaddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handelInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ ...showInput, visible: false });
        }
    };

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 5 }}>
                <div
                    className="folder"
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpand(!expand)}
                >
                    <span>📁{explorer.name}</span>
                    <div>
                        <button onClick={(e) => handleFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleFolder(e, false)}>File +</button>
                    </div>
                </div>

                <div
                    style={{
                        display: expand ? "block" : "none",
                        paddingLeft: 25
                    }}
                >
                    {showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                className="inputContainer__input"
                                type="text"
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                                autoFocus
                                onKeyDown={onaddFolder}
                            />
                        </div>
                    )}
                    {explorer.items.map((exp) => {
                        return (
                            <Folder
                                handelInsertNode={handelInsertNode}
                                explorer={exp}
                                key={exp.id}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return <span className="file">📄{explorer.name}</span>;
    }
}
export default Folder;
