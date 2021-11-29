const handleFocus = (event) => {
    if (event.target.tagName === "INPUT") {
        event.target.select();
    }
};
export default handleFocus;
