import React from 'react';
import { Row, Col } from 'reactstrap';

export const generateTableRows = (results) => {
	let filesProvided = results.filesFromMetadata.sort();
	let filesFound = results.filesInGlobus.sort();
	let filesNotInGlobus = results.metadataFilesNotFoundInGlobus;
	let globusNotInMetadata = results.globusFilesNotFoundInMetadata;
	let rows = [];
	let remainingMetadataFiles = filesProvided;
	let remainingGlobusFiles = filesFound;
	
	if (filesNotInGlobus) {
		remainingMetadataFiles = filesProvided.filter(x => !filesNotInGlobus.includes(x));
		filesNotInGlobus.forEach((file) => {
			rows.push (
				<Row className='mt-3'>
					<Col sm={6}>
						{file}
					</Col>
					<Col sm={6}>
					</Col>
				</Row>
			);
		});
	}

	if (globusNotInMetadata) {
		remainingGlobusFiles = filesFound.filter(x => !globusNotInMetadata.includes(x));
		globusNotInMetadata.forEach((file) => {
			rows.push(
				<Row className='mt-3'>
					<Col sm={6}>
					</Col>
					<Col sm={6}>
						{file}
					</Col>
				</Row>		
			);
		});
	}
	
	let includesMetadataFile = false;
	remainingMetadataFiles.forEach((fileProvided) => {
		if (fileProvided.startsWith('METADATA')) {
			includesMetadataFile = true;
		}
		let fileFound = filesFound.find((file) => file === fileProvided);
		rows.push(
			<Row className='mt-3'>
				<Col sm={6}>
					{fileProvided}
				</Col>
				<Col sm={6}>
					{fileFound}
				</Col>
			</Row>		
		);
		
	});
	
	let metadataFile = remainingGlobusFiles.find((file) => file.startsWith('METADATA'));
	if (metadataFile && !includesMetadataFile) {
		rows.push(
				<Row className='mt-3'>
					<Col sm={6}>
						
					</Col>
					<Col sm={6}>
						{metadataFile}
					</Col>
				</Row>		
			);
	}
	

	return rows;
}