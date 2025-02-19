**middleware.js**
```javascript
export function middleware(req) {
  // Simulate authentication middleware
  if (!req.cookies.authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
export const config = {
  matcher: '/protected',
};
```

**serverComponent.js**
```javascript
import {cookies} from 'next/headers';

export default async function ProtectedComponent() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken');
  
  try {
    if (!authToken) {
      throw new Error('Unauthorized');
    }
    // Fetch protected data here
    const data = await fetch('/api/protectedData', {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    if (!data.ok) {
      // Handle the error
      throw new Error(`Failed to fetch data: ${data.status}`);
    }
    const jsonData = await data.json();
    return <p>Protected Data: {JSON.stringify(jsonData)}</p>;
  } catch (error) {
    //Error Handling
    console.error('Error in ProtectedComponent:', error);
    return <p>Error: {error.message}</p>;
  }
}
```