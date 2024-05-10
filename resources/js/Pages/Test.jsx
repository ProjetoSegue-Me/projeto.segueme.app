import React, { useState } from "react";

const Test = () => {
    return (
        <div className="w-[30vw] h-[30vh] border-2 mx-auto my-[30vh] justify-center flex items-center">
            <form action="" className="mx-auto w-fit flex flex-col gap-4 ">
                <h1 className="w-fit">Hello Charlotte</h1>
                <input type="text" className=" outline-gray-200 outline outline-1" placeholder="Placeholder"/>
                 <input type="submit" value="Submit" className="hover:cursor-pointer bg-green-400 py-2 text-white rounded-sm hover:bg-green-600" />
            </form>
        </div>
    );
};

export default Test;
