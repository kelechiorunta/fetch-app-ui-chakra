import React from 'react'
import { ChakraProvider, Box, Button, Table, Tr, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Thead, Th, Tbody } from '@chakra-ui/react';
import axios from 'axios'
import { useState } from 'react';

function FetchComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {error, setError} = useState(null)

    const fetchData = async () => {
        try{
            setIsLoading(true)
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/')
            setData(response.data)
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setIsLoading(false)
            data && setIsOpen(false)
        }
    }
  return (
        <ChakraProvider>
            <Box p={'4'} shadow={'md'}>
                <Button colorScheme='blue' onClick={() => setIsOpen(true)}>
                    Open Modal
                </Button>
                
                <Modal overflow='scroll' width={{base:'98%', sm:'99%', md:'94%', lg:'93%'}} height={'450px'} 
                        isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalOverlay />
                    <ModalContent overflow='scroll' width={{base:'98%', sm:'96%', md:'98%', lg:'100%'}}>
                        <ModalHeader>Extract Data</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Button colorScheme='blue' onClick={fetchData} isLoading={isLoading}>
                                {isLoading? 'LOADING...' : data? 'View Information':'Extract The Data'}
                            </Button>
                            {data && (
                                <Box mt={'4'} width={{base:'98%', sm:'99%', md:'94%', lg:'98%'}} height={'400px'} overflow={'scroll'}>
                                    
                                    <Table  shadow={'md'} width={{base:'98%', sm:'99%', md:'94%', lg:'98%'} }
                                              border={'1px solid black'} p={4} overflow='scroll'>
                                                {/* <Thead>
                                                    <Tr>
                                                      {/* <Th>ID</Th>
                                                      <Th>Content</Th> */}
                                                    {/* </Tr> */}
                                                 {/* </Thead> */} 
                                        {data.map((i, index) => {
                                               return (  <Tbody border='1px solid' overflow='scroll'>
                                                    <Tr overflowY={'scroll'}>
                                                      <Td>{i.id}</Td>
                                                      <Td>{i.body}</Td>
                                                    </Tr>
                                                </Tbody>
                                                 )
                                        
                                        })}
                                            </Table>
                                           
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
        </ChakraProvider>
        
  )
}

export default FetchComponent