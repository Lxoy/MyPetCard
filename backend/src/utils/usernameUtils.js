import { checkUsername } from './dbUtils.js';

const normalizeCroatian = (str) => {
    return str
        .toLowerCase()
        .replace(/dž/g, 'dz')
        .replace(/lj/g, 'lj')
        .replace(/nj/g, 'nj')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
};

export const generateUniqueUsername = async (baseName) => {
    let username = normalizeCroatian(baseName);
    let suffix = 0;
    let unique = false;

    while (!unique) {
        const toCheck = suffix === 0 ? username : `${username}${suffix}`;
        const result = await checkUsername(toCheck);
        if (result.length === 0) {
            unique = true;
            username = toCheck;
        } else {
            suffix++;
        }
    }

    return username;
};
