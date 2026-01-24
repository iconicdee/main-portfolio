export async function addData(currentTab, formData) {
  try {
    const res = await fetch(`/api/${currentTab}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const payload = await res.json();
    if (!res.ok) {
      console.log("something went wrong");
    }
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export async function getData(currentTab) {
  try {
    const response = await fetch(`/api/${currentTab}/get`, {
      method: "GET",
    });
    const result = await response.json();

    if (!result) {
      console.log("getting result failed");
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateData(currentTab, formData) {
  try {
    const res = await fetch(`/api/${currentTab}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("update failed:", res.status, text);
      return {
        success: false,
        message: text || "request failed",
        status: res.status,
      };
    }

    const payload = await res.json();
    return payload;
  } catch (e) {
    console.log(e);
  }
}

export async function login(formData) {
  try {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const payload = await res.json();
    if (!res.ok) {
      console.log("something went wrong");
    }
    return payload;
  } catch (e) {
    console.log(e);
    console.log("an error occured");
  }
}
