import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CONTACT_SLICE_NAME } from '../../model/constants';
import API from '../../contact-service';

const initialState = {
  contacts: [],
  contactForEdit: createEmptyContact(),
  isFetching: false,
  error: null,
};

export const createContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/createContact`,
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await API.post('/', contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

export const updateContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/updateContact`,
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await API.put(`/${contactData.id}`, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/deleteContact`,
  async (contactId, { rejectWithValue }) => {
    try {
      await API.delete(`/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getContactsAsync = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/getContacts`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContactAsync.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(createContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.contactForEdit = createEmptyContact();
        state.isFetching = false;
        state.error = null; 
      })
      .addCase(createContactAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload; 
      })
      .addCase(updateContactAsync.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id !== action.payload.id ? contact : action.payload
        );
        state.contactForEdit = createEmptyContact();
        state.isFetching = false;
        state.error = null;
      })
      .addCase(updateContactAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(deleteContactAsync.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteContactAsync.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== payload
        );
        state.contactForEdit = createEmptyContact();
        state.isFetching = false;
        state.error = null;
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(getContactsAsync.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getContactsAsync.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isFetching = false;
        state.error = null;
      })
      .addCase(getContactsAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const { addNewContact, selectContact } = contactSlice.actions;

export default contactSlice.reducer;

function createEmptyContact() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
}
