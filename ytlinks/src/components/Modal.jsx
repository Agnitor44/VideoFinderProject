import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import '../styles/list.css'
export default function ModalZone({modal, setModal}) {
 
    return (
        <div>
      
        <Modal  isOpen={modal} >
          <ModalHeader>{modal.title}</ModalHeader>
          <ModalBody >
              <div className="modalBody">
              {modal.platform === 'YT' ? 
         <YouTube opts = {{width: '100%'}} videoId= {modal.id} />
       
         :
         <Vimeo
     width = '450px'
     height = '600px'
  video={modal.id}
  autoplay
/>}
              </div>
    
          </ModalBody>
          <ModalFooter>
           
            <Button color="secondary" onClick = {() => setModal(null)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
}
