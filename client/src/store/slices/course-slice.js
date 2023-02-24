import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import currencyConverter from '../../services/CurrencyConverter';
import axios from 'axios';
const { updateMyCourse } = require('./myCourses_slice');

const countryAbbreviation = {
  Afghanistan: 'AF',
  'Åland Islands': 'AX',
  Albania: 'AL',
  Algeria: 'DZ',
  'American Samoa': 'AS',
  Andorra: 'AD',
  Angola: 'AO',
  Anguilla: 'AI',
  Antarctica: 'AQ',
  'Antigua and Barbuda': 'AG',
  Argentina: 'AR',
  Armenia: 'AM',
  Aruba: 'AW',
  Australia: 'AU',
  Austria: 'AT',
  Azerbaijan: 'AZ',
  Bahamas: 'BS',
  Bahrain: 'BH',
  Bangladesh: 'BD',
  Barbados: 'BB',
  Belarus: 'BY',
  Belgium: 'BE',
  Belize: 'BZ',
  Benin: 'BJ',
  Bermuda: 'BM',
  Bhutan: 'BT',
  Bolivia: 'BO',
  'Bosnia and Herzegovina': 'BA',
  Botswana: 'BW',
  'Bouvet Island': 'BV',
  Brazil: 'BR',
  'British Indian Ocean Territory': 'IO',
  Brunei: 'BN',
  Bulgaria: 'BG',
  'Burkina Faso': 'BF',
  Burundi: 'BI',
  Cambodia: 'KH',
  Cameroon: 'CM',
  Canada: 'CA',
  'Cape Verde': 'CV',
  'Cayman Islands': 'KY',
  'Central African Republic': 'CF',
  Chad: 'TD',
  Chile: 'CL',
  China: 'CN',
  'Christmas Island': 'CX',
  'Cocos (Keeling) Islands': 'CC',
  Colombia: 'CO',
  Comoros: 'KM',
  Congo: 'CG',
  'Congo, the Democratic Republic of the': 'CD',
  'Cook Islands': 'CK',
  'Costa Rica': 'CR',
  "Côte d'Ivoire": 'CI',
  Croatia: 'HR',
  Cuba: 'CU',
  Cyprus: 'CY',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Djibouti: 'DJ',
  Dominica: 'DM',
  'Dominican Republic': 'DO',
  Ecuador: 'EC',
  Egypt: 'EG',
  'El Salvador': 'SV',
  'Equatorial Guinea': 'GQ',
  Eritrea: 'ER',
  Estonia: 'EE',
  Ethiopia: 'ET',
  'Falkland Islands (Malvinas)': 'FK',
  'Faroe Islands': 'FO',
  Fiji: 'FJ',
  Finland: 'FI',
  France: 'FR',
  'French Guiana': 'GF',
  'French Polynesia': 'PF',
  'French Southern Territories': 'TF',
  Gabon: 'GA',
  Gambia: 'GM',
  Georgia: 'GE',
  Germany: 'DE',
  Ghana: 'GH',
  Gibraltar: 'GI',
  Greece: 'GR',
  Greenland: 'GL',
  Grenada: 'GD',
  Guadeloupe: 'GP',
  Guam: 'GU',
  Guatemala: 'GT',
  Guernsey: 'GG',
  Guinea: 'GN',
  'Guinea-Bissau': 'GW',
  Guyana: 'GY',
  Haiti: 'HT',
  'Heard Island and McDonald Islands': 'HM',
  'Holy See (Vatican City State)': 'VA',
  Honduras: 'HN',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  Iceland: 'IS',
  India: 'IN',
  Indonesia: 'ID',
  Iran: 'IR',
  Iraq: 'IQ',
  Ireland: 'IE',
};

const createCourseSubtitles = async (subtitles, token, id) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/course/${id}/subtitle`,
      subtitles,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const handleCurrencyChange = async (userCountry, courses) => {
  const country = countryAbbreviation[userCountry] || 'EG';
  let convertedCourses = courses;
  convertedCourses = await Promise.all(
    courses.map(async (course) => {
      const { newPrice, currency } = await currencyConverter(
        country,
        course.price
      );
      let originalPrice = course.price;
      return { ...course, price: newPrice, originalPrice, currency };
    })
  );
  return convertedCourses;
};

export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // const country = getState().auth?.user?.country;
    try {
      const response = await axios.get('http://localhost:8080/api/v1/course');
      const data = response.data;
      let convertedCourses = data.courses;
      // if (country) {
      //   convertedCourses = await handleCurrencyChange(country, data.courses);
      // }
      return data.courses;
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (content, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    const { course, subtitles } = content;
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/course',
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const convertedCourses = await handleCurrencyChange(
        getState().auth.user.country,
        [data.course]
      );
      console.log(subtitles);
      const id = convertedCourses[0]._id;
      await createCourseSubtitles(subtitles, token, id);

      return convertedCourses[0];
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async (content, { rejectWithValue, getState, dispatch }) => {
    const token = getState().auth.token;
    const { courseId, course, type } = content;
    console.log(content);
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/course/${courseId}?type=${type}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      dispatch(updateMyCourse({ courseId, course: data.updatedCourse, type }));
      // const data = response.data;
      // const convertedCourses = await handleCurrencyChange(
      //   getState().auth.user.country,
      //   [data.course]
      // );
      console.log(response.data);
      return response.data.updatedCourse;
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    coursesIsLoading: false,
    message: null,
    type: null,
  },

  reducers: {
    addCourses(state, action) {
      state.courses = action.payload;
    },

    addCourse(state, action) {
      state.courses.push(action.payload);
    },
  },
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      state.coursesIsLoading = true;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.coursesIsLoading = false;
      state.message = 'Courses fetched successfully';
      state.type = 'success';
    },
    [getCourses.rejected]: (state, action) => {
      state.coursesIsLoading = false;
      state.message = action.payload;
      state.type = 'error';
    },

    [createCourse.pending]: (state, action) => {
      state.coursesIsLoading = true;
    },

    [createCourse.fulfilled]: (state, action) => {
      state.courses.push(action.payload);
      state.coursesIsLoading = false;
      state.message = 'Course created successfully';
      state.type = 'success';
    },

    [createCourse.rejected]: (state, action) => {
      state.coursesIsLoading = false;
      state.message = action.payload;
      state.type = 'error';
    },

    [updateCourse.pending]: (state, action) => {
      state.coursesIsLoading = true;
    },

    [updateCourse.fulfilled]: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course._id === action.payload._id
      );
      state.courses[index] = action.payload;
      state.coursesIsLoading = false;
      state.message = 'Course updated successfully';
      state.type = 'success';
    },

    [updateCourse.rejected]: (state, action) => {
      state.coursesIsLoading = false;
      state.message = action.payload;
      state.type = 'error';
    },
  },
});

export default courseSlice.reducer;

export const courseActions = {
  addCourses: courseSlice.actions.addCourses,
  addCourse: courseSlice.actions.addCourse,
};
