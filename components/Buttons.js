const RegularButton = ({ handle, text }) => {
    return (
        <button className="border-black border-2 rounded-2xl py-2 px-4 hover:bg-green-300" onClick={handle}>
            {" "}
            {text}
        </button>
    );
};

const RedButton = ({ handle, text }) => {
    return (
        <button className="border-black border-2 rounded-2xl py-2 px-4 hover:bg-red-500" onClick={handle}>
            {" "}
            {text}
        </button>
    );
};

const SubmitButton = ({ text }) => {
    return (
        <button type="submit" className="border-black border-2 rounded-2xl py-2 px-4 hover:bg-green-300">
            {" "}
            {text}
        </button>
    );
};

export { RegularButton, RedButton, SubmitButton };
