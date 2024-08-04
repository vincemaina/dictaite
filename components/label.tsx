import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function Label(props: Props) {
    return <span className='bg-blue-800 text-white p-0.5 px-1.5 text-xs font-medium rounded-lg'>
        {props.children}
    </span>;
}