import React from 'react'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

interface Props {

}

const Stocks: React.FC<Props> = () => {
    const [value, setValue] = React.useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value.toUpperCase());

    // const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        debugger;
        event.preventDefault();
        fetch(`/api/stock?symbol=${value}`)
        .then(res => res.json())
        .then(res => console.log(res));
    }

    return (
        // <FormControl onSubmit={handleSubmit}>
        <FormControl >
            <FormLabel>Stock Symbol</FormLabel>
            <Input variant="outline" placeholder="e.g. IBM" value={value} onChange={handleChange} />
            <Button colorScheme="blue" type="button" onClick={handleSubmit}>Button</Button>
        </FormControl>
    );
}

export default Stocks;