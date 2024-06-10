import VersionNote from "@/src/versions/VersionNote";
import nextConfig from "@/next.config";

/**
 * @property label {string}
 * @property value {string}
 * @property notes {Array<Any>}
 */
export default class Version {

    isCurrent = false
    label;
    value;
    notes=[];
    description= "";
    slug = "";

    constructor(data) {
        this.label = data.label ?? "";
        this.value = data.value ?? "0";
        this.notes = data.notes ?? [];
        this.isCurrent = nextConfig.env.VERSION === data.value;
        this.description = data.description ?? "";
        this.slug = "";
    }

    static serialize(version) {
        const jsonProperties = ["label", "value", "notes", "isCurrent", "description"];
        let toJson = {};
        for (let propertyLabel of jsonProperties) {
            toJson[propertyLabel] = version[propertyLabel];
        }
        return JSON.stringify(toJson);
    }

    static deserialize(json) {
        const params = JSON.parse(json);
        return new Version(params.versions);
    }

    render() {
        const NoteTag = "";
        const TitleTag = "h3";
        return (
            <div key={`VersionNote${this.value}`}>
                <TitleTag name={this.value}>{this.isCurrent && <span className={"badge bg-secondary"}>Actuelle</span>} <span className={"text-secondary"}>{this.value}</span> &mdash; {this.label}</TitleTag>
                {this.description !== "" &&
                    <p>{this.description}</p>
                }
                {this.notes.length > 0 &&
                    <>
                        {
                            this.notes.map((noteRaw, index) => {
                                const note = new VersionNote(index, noteRaw);
                                return (note.render())
                            })
                        }
                    </>
                }
            </div>
        )
    }
}
