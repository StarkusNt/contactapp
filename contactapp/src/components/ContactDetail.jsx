import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getContact } from '../api/ContactService';
import { Link } from 'react-router-dom'
import { toastError, toastSuccess } from '../api/ToastService';


const ContactDetail = ({ updateContact, updateImage, deleteContact }) => {
  const inputRef = useRef();
  const deleteModalRef = useRef();
  const [contact, setContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
    photoUrl: ''
  });

const { id } = useParams();
const navigate = useNavigate();

  const fetchContact = async (id) => {
    try {
      const { data } = await getContact(id);
      setContact(data);
      console.log(data)
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };
  const selectImage = () => {
    inputRef.current.click();
  };

  const udpatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', id);

      const newPhotoUrl = await updateImage(formData);

      setContact((prev) => ({
        ...prev,
        photoUrl: `${newPhotoUrl}?updated_at=${new Date().getTime()}`
      }));
      toastSuccess('Photo updated');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

const handleDelete = async () => {
  try {
    deleteModalRef.current.close();
    await deleteContact(id);
    navigate('/contacts'); 
    toastSuccess('Contact Deleted');
  } catch (error) {
    console.log(error);
    toastError(error.message);
  }
};

const toggleDeleteModal = (show) => show ? deleteModalRef.current.showModal() : deleteModalRef.current.close();

  const onUpdateContact = async (event) => {
    event.preventDefault();
    await updateContact(contact);
    fetchContact(id);
    toastSuccess('Contact Updated');

  };

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    fetchContact(id);
  }, []);



return (
  <>
    <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
    <div className='profile'>
      <div className='profile__details'>
        <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
        <div className='profile__metadata'>
          <p className='profile__name'>{contact.name}</p>
          <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
          <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
        </div>
      </div>
      <div className='profile__settings'>
        <div>
          <form onSubmit={onUpdateContact} className="form">
            <div className="user-details">
              <input type="hidden" defaultValue={contact.id} name="id" required />
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={contact.name || ''} onChange={onChange} name="name" required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={contact.email || ''} onChange={onChange} name="email" required />
              </div>
              <div className="input-box">
                <span className="details">Phone</span>
                <input type="text" value={contact.phone || ''} onChange={onChange} name="phone" required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={contact.address || ''} onChange={onChange} name="address" required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={contact.title || ''} onChange={onChange} name="title" required />
              </div>
              <div className="input-box">
                <span className="details">Status</span>
                <input type="text" value={contact.status || ''} onChange={onChange} name="status" required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleDeleteModal(true)} type="button" className="btn btn-danger">Delete</button>
              <button type="submit" className="btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>


    <form style={{ display: 'none' }}>
      <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
    </form>


   <dialog ref={deleteModalRef} className="modal">
  <div className="modal__header">
    <h3>Delete Contact</h3>
    <i onClick={() => toggleDeleteModal(false)} className="bi bi-x-lg"></i>
  </div>
  <div className="divider"></div>
  
  {/* ZMIENIONO: Usunięto style inline, dodano klasę modal__body--delete */}
  <div className="modal__body modal__body--delete">
    <p>Are you sure you want to permanently delete <strong>{contact.name}</strong>? This action cannot be undone.</p>
  </div>
  
  <div className="modal__footer">
    <button onClick={() => toggleDeleteModal(false)} type="button" className="btn">Cancel</button>
    <button onClick={handleDelete} type="button" className="btn btn-danger">Confirm Delete</button>
  </div>
</dialog>
  </>
)
}

export default ContactDetail;
