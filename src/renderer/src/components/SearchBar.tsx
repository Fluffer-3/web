import { InputText } from "primereact/inputtext";

const SearchBar = () => {
    return (
        <div className="flex items-center">
            <InputText
                placeholder="Search... (not functional yet) 🥲"
                className="rounded-2xl shadow-lg w-96"
            />
        </div>
    );
};

export default SearchBar;
