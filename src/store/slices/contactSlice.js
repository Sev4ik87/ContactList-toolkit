import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CONTACT_SLICE_NAME } from '../../model/constants';
import API from '../../contact-service';

const initialState = {
  contacts: [],
  contactForEdit: createEmptyContact(),
};

export const createContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/createContact`,
  async (contactData) => {
    const response = await API.post('/', contactData);
    return response.data;
  }
);

export const updateContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/updateContact`,
  async (contactData) => {
    const response = await API.put(`/${contactData.id}`, contactData);
    return response.data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/deleteContact`,
  async (contactId) => {
    await API.delete(`/${contactId}`);
    return contactId;
  }
);

export const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    addNewContact: (state) => {
      state.contactForEdit = createEmptyContact();
    },
    selectContact: (state, action) => {
      state.contactForEdit = action.payload;
    },
    getContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.contactForEdit = createEmptyContact();
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id !== action.payload.id ? contact : action.payload
        );
        state.contactForEdit = createEmptyContact();
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        state.contactForEdit = createEmptyContact();
      });
  },
});

export const { addNewContact, selectContact, getContacts } = contactSlice.actions;

export const selectContacts = (state) => state.contact.contacts;
export const selectContactForEdit = (state) => state.contact.contactForEdit;

export default contactSlice.reducer;

function createEmptyContact() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
}
