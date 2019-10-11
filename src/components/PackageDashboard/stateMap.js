const stateMap = new Map(
    [
        ["METADATA_RECEIVED", "Waiting for files"],
        ["UPLOAD_SUCCEEDED", "Ready for review"],
        ["FILES_RECEIVED", "Finishing upload"],
        ["UPLOAD_STARTED", "Upload started"]
    ]
);

export default stateMap;