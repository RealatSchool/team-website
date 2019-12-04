{
	"targets": [{
		"target_name": "pathSimplify",
		"include_dirs" : [
			"src",
			"<!(node -e \"require('nan')\")"
		],
		"sources": [
			"src/pathSimplify.cc"
		]
	}]
}