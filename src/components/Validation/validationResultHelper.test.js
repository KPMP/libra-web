import React from 'react';
import { Row, Col } from 'reactstrap';	
import { generateTableRows } from './validationResultHelper';

describe('generateTableRows', () => {
	it('should generate the correct table when files provided matches files found', () => {
		let filesProvided = [ 'a', 'b' ];
		let filesFound = [ 'a', 'b' ];
		let metadataFilesNotFoundInGlobus = null;
		let globusFilesNotFoundInMetadata = null;
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(2);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col></Row>);
	});
	
	it('should generate the correct table when files provided matches files found and metadata file included', () => {
		let filesProvided = [ 'a', 'METADATA_file.xls' ];
		let filesFound = [ 'a', 'METADATA_file.xls' ];
		let metadataFilesNotFoundInGlobus = null;
		let globusFilesNotFoundInMetadata = null;
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(2);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>METADATA_file.xls</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>METADATA_file.xls</Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
	});
	
	it ('should generate the correct table when more files found', () => {
		let filesProvided = [ 'b' ];
		let filesFound = [ 'a', 'b' ];
		let metadataFilesNotFoundInGlobus = null;
		let globusFilesNotFoundInMetadata = ['a'];
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(2);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col></Row>);

	});
	
	it ('should generate the correct table when more files provided', () => {
		let filesProvided = [ 'a', 'b', 'c' ];
		let filesFound = [ 'a', 'b' ];
		let metadataFilesNotFoundInGlobus = ['c'];
		let globusFilesNotFoundInMetadata = null;
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(3);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>c</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
		expect(table[2]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col></Row>);
	});
	
	it ('should generate the correct table when no files found', () => {
		let filesProvided = [ 'c' ];
		let filesFound = [ ];
		let metadataFilesNotFoundInGlobus = ['c'];
		let globusFilesNotFoundInMetadata = [];
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(1);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>c</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
	});
	
	it ('should generate the correct table when fewer provided than found and no overlap', () => {
		let filesProvided = [ 'c' ];
		let filesFound = [ 'a', 'b' ];
		let metadataFilesNotFoundInGlobus = ['c'];
		let globusFilesNotFoundInMetadata = ['a', 'b'];
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(3);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>c</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
		expect(table[2]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>b</Col></Row>);
	});
	
	it ('should generate the correct table when fewer found than provided and no overlap', () => {
		let filesProvided = [ 'c', 'd' ];
		let filesFound = [ 'a' ];
		let metadataFilesNotFoundInGlobus = ['c', 'd'];
		let globusFilesNotFoundInMetadata = ['a'];
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(3);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>c</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>d</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[2]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
	});
	
	it ('should always include the metadata file', () => {
		let filesProvided = [ 'c', 'd' ];
		let filesFound = [ 'a', 'METADATA_file.xls' ];
		let metadataFilesNotFoundInGlobus = ['c', 'd'];
		let globusFilesNotFoundInMetadata = ['a'];
		let results = { filesFromMetadata: filesProvided, filesInGlobus: filesFound,
				metadataFilesNotFoundInGlobus, globusFilesNotFoundInMetadata };
		
		let table = generateTableRows(results);
		
		expect(table.length).toEqual(4);
		expect(table[0]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>c</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[1]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>d</Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col></Row>);
		expect(table[2]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>a</Col></Row>);
		expect(table[]).toEqual(<Row className='mt-3' tag='div'><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}></Col><Col sm={6} tag='div' widths={['xs', 'sm', 'md', 'lg', 'xl']}>METADATA_file.xls</Col></Row>);
	});
});