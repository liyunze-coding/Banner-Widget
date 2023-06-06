const commands = configs.commands;

function isMod(flags) {
	return flags.broadcaster || flags.mod;
}

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	// check if command is in the list of commands
	command = `!${command.toLowerCase()}`;

	if (commands.includes(command)) {
		// check if user is a mod
		if (isMod(flags)) {
			// check if message is empty
			if (message.length > 0) {
				// update banner
				updateBanner(message);
			} else {
				// reset banner
				updateBanner(configs.settings.defaultText);
			}
		}
	}
};

ComfyJS.Init(configs.details.username);
