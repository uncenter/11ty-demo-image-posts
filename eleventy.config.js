const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ public: "." });

	eleventyConfig.addFilter("toLuxonDateTime", (dateString) => {
		const date = DateTime.fromISO(dateString, { zone: "utc" });
		if (!date.isValid) {
			throw new Error(
				`[toLuxonDateTime (filter)] date value "${dateString}" is invalid`
			);
		}
		return date.toJSDate();
	});

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "dd LLLL yyyy"
		);
	});

	return {
		dir: {
			input: "src",
			includes: "_includes",
			data: "_data",
			output: "dist",
		},
	};
};
