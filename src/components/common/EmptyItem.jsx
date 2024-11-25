import React from 'react'

const EmptyItem = ({ headerMessage, detailsMessage }) => {
    return (
        <div className='flex w-full justify-end items-center min-h-[30vh] flex-col'>
            <div className='font-bold text-lg'>
                {headerMessage}
            </div>

            <div>
                {detailsMessage}
            </div>

        </div>
    )
}

export default EmptyItem