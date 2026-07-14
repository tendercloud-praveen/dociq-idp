import axiosInstance from "../api/axiosInstance";

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/login/", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};
/* Upload Documents */
export const uploadDocuments = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      full_name: data.fullName,
      company_name: data.company,
      email: data.email,
      mobile_number: data.mobileNumber,
      role: data.role.toLowerCase(),
      password: data.password,
      confirm_password: data.confirmPassword,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
/* Forgot Password Services */
export const sendResetLink = async (email) => {
  const response = await axiosInstance.post(
    "/users/forgot-password",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await axiosInstance.post(
    "/users/reset-password",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const sendOtpInstead = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password/otp", {
    email,
  });
  return response.data;
};
/* Get All Documents */
export const getDocuments = async () => {
  const response = await axiosInstance.get("/documents/total");
  return response.data;
};

/* Approved Documents */
export const getApprovedDocuments = async () => {
  const response = await axiosInstance.get("/documents/total/approved");
  return response.data;
};

/* Pending Documents */
export const getPendingDocuments = async () => {
  const response = await axiosInstance.get("/documents/total/pending");
  return response.data;
};

/* Rejected Documents */
export const getRejectedDocuments = async () => {
  const response = await axiosInstance.get("/documents/total/rejected");
  return response.data;
};

/* Approve Document */
export const approveDocument = async (id) => {
  const response = await axiosInstance.put(`/documents/approve/${id}`);
  return response.data;
};

/* Reject Document */
export const rejectDocument = async (id, payload = {}) => {
  const response = await axiosInstance.put(`/documents/reject/${id}`, payload);
  return response.data;
};

/* Get Single Document */
export const getDocumentById = async (id) => {
  const response = await axiosInstance.get(`/documents/${id}`);
  return response.data;
};

/* Delete Document */
export const deleteDocument = async (id) => {
  const response = await axiosInstance.delete(`/documents/${id}`);
  return response.data;
};

/* Dashboard Summary */

export const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/dashboard/summary");
  return response.data;
};

export const getWeeklyDocuments = async () => {
  const response = await axiosInstance.get("/documents/today");
  return response.data;
};

export const getWeeklyApproved = async () => {
  const response = await axiosInstance.get("/documents/today/approved");
  return response.data;
};

export const getWeeklyPending = async () => {
  const response = await axiosInstance.get("/documents/today/pending");
  return response.data;
};

export const getWeeklyRejected = async () => {
  const response = await axiosInstance.get("/documents/today/rejected");
  return response.data;
};

export const getMonthlyDocuments = async () => {
  const response = await axiosInstance.get("/documents/monthly");
  return response.data;
};

export const getMonthlyApproved = async () => {
  const response = await axiosInstance.get("/documents/monthly/approved");
  return response.data;
};

export const getMonthlyPending = async () => {
  const response = await axiosInstance.get("/documents/monthly/pending");
  return response.data;
};

export const getMonthlyRejected = async () => {
  const response = await axiosInstance.get("/documents/monthly/rejected");
  return response.data;
};

/* Update Document */

export const updateDocument = async (documentId, payload) => {
  const response = await axiosInstance.patch(
    `/pending/update/${documentId}`,
    payload,
  );

  return response.data;
};
export const exportReport = async (period, reportType, fileFormat) => {
  const response = await axiosInstance.get("/reports/export", {
    params: {
      period,
      report_type: reportType,
      file_format: fileFormat,
    },
    responseType: "blob",
  });

  return response.data;
};

export const getAuditTrail = async (id) => {
  const response = await axiosInstance.get(`/audit/${id}`);
  return response.data;
};
