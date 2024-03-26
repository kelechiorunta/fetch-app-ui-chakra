import React from 'react'
import { ChakraProvider, Box, Button, Table, Tr, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Thead, Th, Tbody, FormLabel, Input, Heading } from '@chakra-ui/react';
import axios from 'axios'
import { useState } from 'react';

function FetchComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [apiAddress, setApiAddress] = useState('https://jsonplaceholder.typicode.com/posts/')

    const fetchData = async () => {
        try{
            setIsLoading(true)
            const response = await axios.get(apiAddress)
            setData(response.data)
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setIsLoading(false)
            setIsOpen(false)
            setIsEdit(false)
        }
    }
  return (
        <ChakraProvider>
            <Box p={'4'} shadow={'md'} height={{base:'98%', sm:'96%', md:'98%', lg:'98%'}} overflow={'scroll'} m='auto'
                 width={{base:'98%', sm:'96%', md:'98%', lg:'98%'}}> 
                <Button colorScheme='blue' onClick={() => setIsOpen(true)}>
                    Open Modal
                </Button>
                
                <Modal overflow='scroll' width={{base:'98%', sm:'99%', md:'94%', lg:'93%'}} height={'450px'} 
                        isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalOverlay />
                    <ModalContent overflow='scroll' width={{base:'98%', sm:'96%', md:'98%', lg:'100%'}}>
                        <ModalHeader>Extract Data</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody height={'300px'}>
                            <FormLabel htmlFor='site'>
                               Please Enter A Valid API EndPoint
                               <Input id='site' type='text' onChange={(e)=>{setApiAddress(e.target.value.toString()); setIsEdit(true)}} value={apiAddress}/>
                            </FormLabel>
                    
                            <Button colorScheme='blue' onClick={fetchData} isLoading={isLoading}>
                                {isLoading? 'LOADING...' : data? 'View Information':'Extract The Data'}
                            </Button>
                            {data && (
                                <Box onLoad={()=>setIsOpen(false)} mt={'4'} width={{base:'98%', sm:'99%', md:'94%', lg:'98%'}} height={'auto'} overflow={'scroll'}>
                                    {!isEdit?`Data was extracted successfully from ${apiAddress}. Feel free to check another valid API endpoint.`:''}    
                                    {/* <pre p={20} width={{base:'98%', sm:'99%', md:'94%', lg:'98%'}}>{JSON.stringify(data, null, 2)}</pre> */}
                                </Box>
                            )}
                            {error && <Box color={'blue'}>{Error}</Box>}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant={'ghost'} mr={3} onClick={() => setIsOpen(false)}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                
            </Box>
            {(!isOpen && data) ? <div><Table shadow={'md'} width={{base:'98%', sm:'99%', md:'94%', lg:'98%'} }
                                        height={{base:'98%', sm:'99%', md:'94%', lg:'400px'} }
                                              border={'1px solid black'} p={4} overflow='scroll' m='auto'>
                                                <Thead>
                                                    <Tr>
                                                      <Th>{Object.keys(data[0])[0]}</Th>
                                                      <Th>{Object.keys(data[0])[1]}</Th> 
                                                      <Th>{Object.keys(data[0])[2]}</Th>
                                                      <Th>{Object.keys(data[0])[3]}</Th>
                                                    </Tr>
                                                 </Thead> 
                                        {data.map((i, index) => { const objectFirst = i[Object.keys(data[0])[0]][Object.keys(i[Object.keys(data[0])[0]])[0]] || i[Object.keys(data[0])[0]];
                                                                  const objectSecond = i[Object.keys(data[0])[0]][Object.keys(i[Object.keys(data[0])[0]])[1]] || i[Object.keys(data[1])[1]];
                                                                  const objectThird = i[Object.keys(data[0])[2]]//[Object.keys(i[Object.keys(data[0])[0]])[0]];
                                                                  const objectFourth = i[Object.keys(data[0])[3]]//[Object.keys(i[Object.keys(data[0])[9]])[0]];

                                               return (  
                                               
                                               <Tbody border='1px solid' overflow='scroll' > 
                                                    <Tr overflowY={'scroll'}>
                                                      <Td>{objectFirst}</Td>
                                                      <Td>{objectSecond}</Td>
                                                      <Td>{objectThird}</Td>
                                                      <Td>{objectFourth}</Td>
                                                      {/* <Td>{i[Object.keys(data[0])[2]]}</Td> */}
                                                      {/* <Td>{i[Object.keys(data[0])[3]]}</Td> */}
                                                    </Tr>
                                                </Tbody>
                                                 )
                                        
                                        })}
                                            </Table></div> :
                                <Heading as={'h1'}>Click the Modal</Heading>}
        </ChakraProvider>
        
  )
}

export default FetchComponent