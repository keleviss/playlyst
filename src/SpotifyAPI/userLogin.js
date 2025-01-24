export async function userLogin() {
  const clientId = '48d1d399d53d4e67b0cbd4e541a71ff4';
  const code = extractCode();

  if (code) {
    console.log("We found a code! Let's see if we have an access token");
    const access_token = localStorage.getItem('access_token');

    if (!access_token || access_token === 'undefined') {
      console.log("We did not find an access token! Let's generate one!");

      const accessToken = await getAccessToken(clientId, code);
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        const profile = await fetchProfile(accessToken);
        return profileData(profile);
      }
    } else {
      console.log("Existing access token found: " + access_token + " Let's fetch user data");
      const profile = await fetchProfile(access_token);
      if (profile) {
        console.log('profile is ok');
        return profileData(profile);
      } else {
        console.log('profile is NOT ok');
        localStorage.removeItem('access_token');
      }
    }
  } else {
    console.log("We did not find a code! We cannot check for the access token");
  }
}

async function profileData(profile) {
  return {
    display_name: profile.display_name,
    email: profile.email,
    spotify_url: profile.external_urls.spotify,
    id: profile.id,
    image: profile.images[1].url,
    product: profile.product
  };
}

function extractCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (code) {
    localStorage.setItem('code', code);
    window.history.replaceState({}, document.title, "/"); // Remove code from URL
    return code;
  }  else {
    const storedCode = localStorage.getItem('code');
    return storedCode;
  }
}

export const redirectToAuthCodeFlow = async (clientId) => {
  // Redirect to Spotify authorization page
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://playlistjammming.netlify.app/");
  params.append("scope", "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
  // Get access token for code
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://playlistjammming.netlify.app/");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchProfile(token) {
  // Call Web API
  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if(result.ok) {
      return await result.json();
    }

  } catch (error) {
    console.log("Couldn't fetch profile data: ", error);
  }
}