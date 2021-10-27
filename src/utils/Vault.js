function generatePassword() {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&/-_*+';
	let charactersLength = characters.length;
	for (let i = 0; i < Math.floor(Math.random() * 4) + 12; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}

const colors = ['red', 'orange', 'yellow', 'green', 'turquoise', 'light-blue', 'blue', 'purple', 'gray'];

module.exports = {
    generatePassword,
    colors
};