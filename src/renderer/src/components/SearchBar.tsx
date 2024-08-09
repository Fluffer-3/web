import { TextInput } from "@mantine/core";

const SearchBar = () => {
    return (
        <div className="flex items-center">
            <TextInput
                placeholder="Search... (not functional yet) 🥲"
                radius="xl"
            />
        </div>
    );
};

export default SearchBar;
