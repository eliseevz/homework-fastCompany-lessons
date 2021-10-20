import React from 'react';

const SearchUser = ({search ,onSearch}) => {



    return (
        <div className="container">
            <input
                className="w-100 mb-2 p-2"
                type="text"
                placeholder="Введите имя..."
                onChange={onSearch}
                value={search}
            />
        </div>
    );
};

export default SearchUser;
