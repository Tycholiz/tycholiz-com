curl 'https://<project-id>.api.sanity.io/v2021-06-07/data/mutate/<dataset-name>' \
	-H 'Authorization: Bearer <token>' \
	-H 'Content-Type: application/json' \
	--data-binary '{ \
		"mutations": [ \
			{ \
				"patch": { \
					"id": "123", \
					"set": { \
						"name.first": "John" \
					}, \
					"inc": { \
						"visitCount": 1 \
					} \
				} \
			} \
		] \
	}'