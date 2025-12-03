**Prompt:**
Buatkan aplikasi dashboard dengan fokus **mobile-first dan optimalisasi tampilan data** di semua device. Prioritaskan **keterbacaan dan informasi maksimal** terutama di mobile, dengan kompromi minimal pada padding/margin. **Gunakan `useTransition` untuk efek loading saat API call**.

## **1. Autentikasi**

- Implementasi login menggunakan endpoint `POST https://dummyjson.com/auth/login`
- Simpan token JWT di localStorage/sessionStorage
- Setiap request ke endpoint yang membutuhkan auth harus menyertakan header Authorization dengan Bearer token
- Implementasi logout dengan menghapus token
- Gunakan dummy credentials:
  ```json
  {
    "username": "emilys",
    "password": "emilyspass",
    "expiresInMins": 30
  }
  ```

## **2. Layout & Navigasi Responsif**

### **Prinsip Utama:**

- **Mobile-First Design** - Data harus terbaca sempurna di layar kecil
- **Informasi > Estetika** di mobile - kurangi padding/margin yang tidak perlu
- **Desktop**: Sidebar kiri untuk navigasi, tengah untuk Main Content Area
- **Mobile**: Bottom navigation dengan hierarki menu yang disederhanakan

### **Desktop Layout (≥ 768px):**

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] [Search]                    [Theme] [Profile]    │ ← Header
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────────────────────────┐  │
│  │             │  │                                 │  │
│  │  Sidebar    │  │                                 │  │
│  │  Navigation │  │    MAIN CONTENT AREA            │  │
│  │             │  │                                 │  │
│  │  • Dashboard│  │                                 │  │
│  │  • Master   │  │                                 │  │
│  │  • Human    │  │  (Gunakan useTransition untuk   │  │
│  │    Capital  │  │   smooth loading transitions)   │  │
│  │  • TAF      │  │                                 │  │
│  │  • CorpComp │  │                                 │  │
│  │  • Settings │  │                                 │  │
│  │  • Profile  │  │                                 │  │
│  │             │  │                                 │  │
│  └─────────────┘  └─────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **Mobile Layout (< 768px):**

```
┌─────────────────────────────────────────┐
│ [Logo] [Search] [Theme] [Mobile Menu]   │ ← Header
├─────────────────────────────────────────┤
│                                         │
│        MAIN CONTENT AREA                │
│                                         │
│    (Data tampil full-width dengan       │
│     padding minimal/0 untuk tabel)      │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ [Dashboard] [Master] [⋯] [Profile]      │ ← Bottom Navigation
└─────────────────────────────────────────┘
```

**Mobile Navigation Detail:**

- **Dashboard** (icon + label)
- **Master** (icon + label)
- **MoreMenu (⋯)** → Dropdown berisi:
  - Human Capital
  - TAF
  - CorpComp
  - Settings
- **Profile** (icon + label)

## **3. Implementasi useTransition untuk Loading Effects**

### **Contoh Implementasi:**

```tsx
// hooks/useAsyncTransition.ts
import { useTransition } from "react";

export const useAsyncTransition = () => {
  const [isPending, startTransition] = useTransition();

  const runAsync = async (asyncFn: () => Promise<any>) => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await asyncFn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  return { isPending, runAsync };
};

// Contoh penggunaan di komponen:
const DashboardPage = () => {
  const [data, setData] = useState(null);
  const { isPending, runAsync } = useAsyncTransition();

  const fetchDashboardData = async () => {
    await runAsync(async () => {
      const result = await api.getDashboardData();
      setData(result);
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      {isPending ? (
        <SkeletonLoading /> // Smooth transition dengan useTransition
      ) : (
        <DashboardContent data={data} />
      )}
    </div>
  );
};
```

### **Loading Indicators dengan useTransition:**

```tsx
// components/ui/TransitionLoader.tsx
const TransitionLoader = ({ isPending }: { isPending: boolean }) => {
  return (
    <div
      className={`
      fixed inset-0 bg-background/50 backdrop-blur-sm
      flex items-center justify-center
      transition-all duration-300 ease-in-out
      ${isPending ? "opacity-100 z-50" : "opacity-0 pointer-events-none -z-10"}
    `}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};
```

## **4. Layout Components dengan useTransition**

### `MainContentArea.tsx`:

```tsx
const MainContentArea = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  // Smooth transition saat route berubah
  useEffect(() => {
    startTransition(() => {
      // Content akan di-render dengan transition
    });
  }, [location]);

  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <div
        className={`
        transition-opacity duration-300 ease-in-out
        ${isPending ? "opacity-50" : "opacity-100"}
      `}
      >
        {children}
      </div>

      {/* Global loading indicator */}
      {isPending && (
        <div className="absolute top-4 right-4">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
    </main>
  );
};
```

## **5. Data Fetching dengan Optimized Transitions**

### `DataTableWithTransition.tsx`:

```tsx
const DataTableWithTransition = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  // Filter data dengan transition untuk menghindari UI freeze
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [data, filter]);

  const handleFilterChange = (value: string) => {
    // Gunakan startTransition untuk filter changes
    startTransition(() => {
      setFilter(value);
    });
  };

  // API call dengan transition
  const fetchData = async () => {
    startTransition(async () => {
      const result = await api.fetchTableData();
      setData(result);
    });
  };

  return (
    <div className="relative">
      {/* Filter input */}
      <input
        type="text"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search..."
      />

      {/* Loading overlay selama transition */}
      <div
        className={`
        absolute inset-0 bg-background/50 flex items-center justify-center
        transition-all duration-200
        ${isPending ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}
      `}
      >
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>

      {/* Table dengan conditional padding untuk mobile */}
      <div
        className={`
        overflow-x-auto
        ${isPending ? "blur-sm" : ""}
        mobile:px-0 mobile:-mx-4
        tablet:px-4
        desktop:px-6
      `}
      >
        <table className="w-full min-w-[600px]">{/* Table content */}</table>
      </div>
    </div>
  );
};
```

## **6. Implementasi Routing dengan Suspense & Transitions**

```tsx
// router.tsx
import { Suspense, lazy } from "react";
import { useTransition } from "react";

// Lazy load pages dengan Suspense
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MasterPage = lazy(() => import("./pages/MasterPage"));

const AppRouter = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Router>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <LayoutWithTransition isPending={isPending}>
                  <DashboardPage />
                </LayoutWithTransition>
              }
            />
            <Route
              path="/dashboard"
              element={
                <LayoutWithTransition isPending={isPending}>
                  <DashboardPage />
                </LayoutWithTransition>
              }
            />
            <Route
              path="/master"
              element={
                <LayoutWithTransition isPending={isPending}>
                  <MasterPage />
                </LayoutWithTransition>
              }
            />
            {/* Routes lainnya */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

// Layout dengan transition effects
const LayoutWithTransition = ({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending: boolean;
}) => {
  return (
    <RootLayout>
      <div
        className={`
        transition-all duration-300 ease-in-out
        ${isPending ? "opacity-70 scale-[0.99]" : "opacity-100 scale-100"}
      `}
      >
        {children}
      </div>

      {/* Transition progress bar */}
      {isPending && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 overflow-hidden">
          <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
      )}
    </RootLayout>
  );
};
```

## **7. Mobile-Optimized Tables dengan Zero Padding**

### `MobileOptimizedTable.tsx`:

```tsx
const MobileOptimizedTable = ({ data }: { data: any[] }) => {
  const { isMobile } = useResponsive();
  const [isPending, startTransition] = useTransition();
  const [sortConfig, setSortConfig] = useState(null);

  // Sort data dengan transition
  const handleSort = (key: string) => {
    startTransition(() => {
      setSortConfig({ key, direction: "asc" });
    });
  };

  return (
    <div
      className={`
      relative
      ${isMobile ? "w-screen -mx-4 overflow-x-auto" : "w-full"}
    `}
    >
      {/* Loading indicator */}
      {isPending && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Table container - NO PADDING di mobile */}
      <div
        className={`
        ${isMobile ? "min-w-full px-0" : "w-full"}
        transition-opacity duration-200
        ${isPending ? "opacity-50" : "opacity-100"}
      `}
      >
        {isMobile ? (
          // Mobile view: Card list atau horizontal scroll table
          <MobileCardListView data={data} />
        ) : (
          // Desktop view: Full table
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Column 1</th>
                <th className="p-3 text-left">Column 2</th>
                {/* ... */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3">{item.field1}</td>
                  <td className="p-3">{item.field2}</td>
                  {/* ... */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
```

## **8. Dashboard Stats dengan Smooth Transitions**

### `AnimatedStatsCard.tsx`:

```tsx
const AnimatedStatsCard = ({
  title,
  value,
  change,
  isLoading,
}: StatsCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Animate value change dengan transition
  useEffect(() => {
    if (!isLoading) {
      startTransition(() => {
        // Animate value counter
        const duration = 1000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [value, isLoading]);

  return (
    <div
      className={`
      bg-card rounded-lg border p-4
      transition-all duration-300
      hover:shadow-lg hover:scale-[1.02]
      ${isPending ? "opacity-70" : "opacity-100"}
    `}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {isLoading && (
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        )}
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold">
          {isPending ? (
            <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          ) : (
            displayValue.toLocaleString()
          )}
        </div>

        {change && (
          <div
            className={`
            text-sm mt-1 inline-flex items-center
            transition-colors duration-200
            ${change > 0 ? "text-green-600" : "text-red-600"}
          `}
          >
            {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};
```

## **9. Custom Hook untuk Data Fetching dengan Transitions**

### `hooks/useFetchWithTransition.ts`:

```tsx
import { useState, useTransition } from "react";

export const useFetchWithTransition = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = async (fetchFn: () => Promise<T>) => {
    setError(null);

    startTransition(async () => {
      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  const refetch = () => {
    if (data) {
      startTransition(() => {
        // Trigger re-fetch dengan transition
      });
    }
  };

  return {
    data,
    error,
    isPending,
    fetchData,
    refetch,
    isLoading: isPending && !data && !error,
  };
};

// Contoh penggunaan:
const DashboardPage = () => {
  const { data, isLoading, fetchData } = useFetchWithTransaction();

  useEffect(() => {
    fetchData(() => api.getDashboardStats());
  }, []);

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  return <DashboardContent data={data} />;
};
```

## **10. Global Loading State dengan NProgress**

```tsx
// components/layout/GlobalLoadingBar.tsx
const GlobalLoadingBar = () => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => {
      startTransition(() => {
        // Start loading
      });
    };

    const handleComplete = () => {
      // Complete loading
    };

    // Simulate route changes
    handleStart();
    const timer = setTimeout(handleComplete, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden">
      <div
        className={`
        h-full bg-linear-to-r from-blue-500 to-blue-600
        transition-transform duration-300 ease-out
        ${
          isPending
            ? "-translate-x-full animate-[loading_1.5s_ease-in-out_infinite]"
            : "translate-x-0"
        }
      `}
      ></div>
    </div>
  );
};

// Tambahkan CSS animation
// @keyframes loading {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(400%); }
// }
```

## **11. File Struktur dengan Optimized Transitions**

```
src/
├── components/
│   ├── layout/
│   │   ├── RootLayout.tsx              # Layout utama
│   │   ├── DesktopSidebar.tsx          # Sidebar kiri (desktop)
│   │   ├── MobileBottomNav.tsx         # Bottom nav (mobile)
│   │   ├── MainContentArea.tsx         # Area konten tengah
│   │   ├── Header.tsx                  # Header dengan search
│   │   └── GlobalLoadingBar.tsx        # Global loading dengan transition
│   ├── ui/
│   │   ├── TransitionLoader.tsx        # Loader dengan transition
│   │   ├── AnimatedCard.tsx            # Card dengan animasi
│   │   ├── DataTableWithTransition.tsx # Tabel dengan smooth updates
│   │   └── SkeletonLoader.tsx          # Skeleton dengan transition
│   └── dashboard/
│       ├── AnimatedStatsCard.tsx       # Stats card dengan counter animation
│       ├── ChartWithTransition.tsx     # Chart loading dengan transition
│       └── MobileOptimizedTable.tsx    # Tabel zero-padding mobile
├── hooks/
│   ├── useAsyncTransition.ts           # Hook untuk async dengan transition
│   ├── useFetchWithTransition.ts       # Data fetching dengan transition
│   ├── useSmoothState.ts               # State updates dengan transition
│   └── useResponsive.ts                # Responsive utilities
├── pages/
│   ├── DashboardPage.tsx               # Menggunakan useTransition untuk loading
│   ├── MasterPage.tsx                  # Data table dengan smooth filtering
│   └── ... (halaman lainnya)
└── utils/
    ├── transitionUtils.ts              # Helper functions untuk transitions
    └── animationConfig.ts              # Konfigurasi animation durations
```

## **12. CSS untuk Smooth Transitions**

```css
/* Tambahkan di global CSS */
.transition-all-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-opacity-smooth {
  transition: opacity 0.2s ease-in-out;
}

.transition-transform-smooth {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation untuk loading states */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Transition untuk mobile table */
.mobile-table-transition {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.mobile-table-transition.loading {
  transform: translateX(10px);
  opacity: 0.7;
}
```

**Key Implementation Notes:**

1. **Gunakan `useTransition`** untuk semua data fetching dan state updates yang bisa menyebabkan UI freeze
2. **Mobile tables harus zero-padding** untuk optimal space utilization
3. **Smooth transitions** antara loading states dan content display
4. **Progress indicators** untuk long-running operations
5. **Debounce API calls** yang dipicu oleh user input, gunakan transition untuk UI updates

Prompt ini akan menghasilkan dashboard yang **sangat responsif** dengan **smooth transitions** menggunakan `useTransition`, terutama optimal untuk **mobile display** dengan data presentation maksimal.

---

# 📊 STATUS IMPLEMENTASI

## ✅ **Completed (Phase 1-3)**

### 1. Autentikasi ✅
- ✅ AuthContext dengan login/logout
- ✅ Integrasi DummyJSON API (`https://dummyjson.com/auth/login`)
- ✅ Token management di localStorage
- ✅ Protected routes dengan ProtectedRoute component
- ✅ Login page dengan form

**Files:**
- `/src/contexts/AuthContext.tsx`
- `/src/pages/LoginPage.tsx`
- `/src/components/layout/ProtectedRoute.tsx`

### 2. Layout & Navigation ✅
- ✅ RootLayout sebagai layout utama
- ✅ DesktopSidebar untuk navigasi desktop
- ✅ MobileBottomNav untuk navigasi mobile
- ✅ Header dengan search, theme toggle, dan profile menu
- ✅ MainContentArea sebagai container konten
- ✅ Responsive layout (mobile-first)

**Files:**
- `/src/components/layout/RootLayout.tsx`
- `/src/components/layout/DesktopSidebar.tsx`
- `/src/components/layout/MobileBottomNav.tsx`
- `/src/components/layout/Header.tsx`
- `/src/components/layout/MainContentArea.tsx`
- `/src/components/layout/MobileSidebarContent.tsx`

### 3. Routing ✅
- ✅ React Router v7 setup
- ✅ Protected routes configuration
- ✅ All page routes defined

**Files:**
- `/src/router.tsx`
- `/src/main.tsx`

### 4. Basic Hooks ✅
- ✅ useAsyncTransition hook created
- ✅ use-mobile hook for responsive detection

**Files:**
- `/src/hooks/useAsyncTransition.ts`
- `/src/hooks/use-mobile.ts`

### 5. Pages Structure ✅
- ✅ DashboardPage (placeholder)
- ✅ MasterPage (placeholder)
- ✅ HumanCapitalPage (placeholder)
- ✅ TAFPage (placeholder)
- ✅ CorpCompPage (placeholder)
- ✅ SettingsPage (placeholder)
- ✅ ProfilePage (placeholder)

**Files:**
- `/src/pages/DashboardPage.tsx`
- `/src/pages/MasterPage.tsx`
- `/src/pages/HumanCapitalPage.tsx`
- `/src/pages/TAFPage.tsx`
- `/src/pages/CorpCompPage.tsx`
- `/src/pages/SettingsPage.tsx`
- `/src/pages/ProfilePage.tsx`

---

## 🚧 **In Progress / Not Yet Implemented**

### Phase 4: useTransition Integration 🔄

**Status:** Hook created, but NOT YET integrated into components

**Perlu diimplementasikan:**

1. **MainContentArea enhancement** ⏳
   - Integrate useTransition for route changes
   - Add loading indicator during transitions
   - Add opacity/scale effects during navigation

2. **Data Fetching Components** ⏳
   - Create `useFetchWithTransition` hook
   - Implement in all pages that fetch data
   - Add loading states with smooth transitions

3. **Loading Components** ⏳
   - Create `TransitionLoader` component
   - Create `GlobalLoadingBar` component
   - Add loading skeletons for each page

### Phase 5: Dashboard Implementation 📊

**Status:** Placeholder only - NO REAL DATA YET

**Yang perlu diimplementasikan:**

1. **Dashboard Stats Cards** ⏳
   - Create `AnimatedStatsCard` component dengan counter animation
   - Fetch data dari DummyJSON atau endpoint lain
   - Implement smooth value transitions
   - Add loading states

2. **Dashboard Charts** ⏳
   - Integrate Recharts
   - Create `ChartWithTransition` component
   - Add smooth loading untuk chart data
   - Implement responsive charts untuk mobile

3. **Dashboard Data Table** ⏳
   - Create data table with sorting/filtering
   - Implement dengan useTransition untuk smooth updates
   - Mobile-optimized dengan zero padding

### Phase 6: Master Data Implementation 📋

**Status:** Placeholder page only

**Yang perlu diimplementasikan:**

1. **Data Table Component** ⏳
   - Create `MobileOptimizedTable` component
   - Implement horizontal scroll di mobile
   - Zero padding untuk mobile view
   - Desktop: full table dengan sorting

2. **Table Features** ⏳
   - Search/filter dengan useTransition
   - Pagination
   - Column sorting dengan smooth animation
   - Row selection

3. **CRUD Operations** ⏳
   - Create/Edit/Delete dialogs
   - Form validation dengan react-hook-form + zod
   - Optimistic updates dengan transitions

### Phase 7: Sub-Menu Pages ⏳

**Status:** Placeholder pages created, no content

**Halaman yang perlu implementasi konten:**
- Human Capital Page
- TAF Page
- CorpComp Page
- Settings Page
- Profile Page

### Phase 8: Mobile Optimization 📱

**Status:** Layout ready, content optimization needed

**Yang perlu diimplementasikan:**

1. **Zero-Padding Tables** ⏳
   - Remove padding di mobile untuk tables
   - Implement `-mx-4` technique untuk full-width
   - Horizontal scroll optimization

2. **Mobile Card Views** ⏳
   - Alternative view untuk tables di mobile
   - Card-based list untuk better UX
   - Swipe gestures (optional)

3. **Touch Optimizations** ⏳
   - Larger tap targets (min 44x44px)
   - Touch-friendly spacing
   - Swipeable components

### Phase 9: Advanced Features ⏳

1. **Global Search** ⏳
   - Implement search functionality di Header
   - Search across all modules
   - Keyboard shortcuts (Cmd/Ctrl + K)

2. **Notifications** ⏳
   - Real-time notifications
   - Toast notifications dengan Sonner
   - Notification center

3. **Settings Page** ⏳
   - Theme settings
   - User preferences
   - Account management

4. **Profile Page** ⏳
   - User profile display
   - Edit profile functionality
   - Avatar upload
   - Activity history

---

## 📋 **Implementation Checklist**

### Priority 1: Core Functionality 🔥
- [ ] Implement `useFetchWithTransition` hook
- [ ] Create `TransitionLoader` component
- [ ] Create `GlobalLoadingBar` component
- [ ] Integrate useTransition di `MainContentArea`
- [ ] Implement Dashboard dengan real data
- [ ] Create `AnimatedStatsCard` component
- [ ] Implement Master Page dengan data table

### Priority 2: Data & Tables 📊
- [ ] Create `MobileOptimizedTable` component
- [ ] Implement `DataTableWithTransition`
- [ ] Add search/filter functionality dengan transitions
- [ ] Add pagination
- [ ] Add column sorting
- [ ] Implement CRUD operations

### Priority 3: Sub-Pages 📄
- [ ] Implement Human Capital Page content
- [ ] Implement TAF Page content
- [ ] Implement CorpComp Page content
- [ ] Implement Settings Page functionality
- [ ] Implement Profile Page dengan user data

### Priority 4: Mobile Optimization 📱
- [ ] Zero-padding implementation untuk tables
- [ ] Mobile card views alternative
- [ ] Touch optimization
- [ ] Swipe gestures (optional)

### Priority 5: Polish & Advanced Features ✨
- [ ] Global search implementation
- [ ] Real-time notifications
- [ ] Theme customization advanced options
- [ ] Loading skeletons untuk semua pages
- [ ] Error boundaries
- [ ] Analytics tracking (optional)

---

## 🛠️ **Technical Debt & Improvements**

1. **Type Safety** 📝
   - Add proper TypeScript types untuk all API responses
   - Create shared types/interfaces
   - Remove any `any` types

2. **Performance** ⚡
   - Implement React.lazy untuk code splitting
   - Add Suspense boundaries
   - Optimize bundle size
   - Implement virtual scrolling untuk large lists

3. **Testing** 🧪
   - Add unit tests (Vitest)
   - Add integration tests
   - Add E2E tests (Playwright/Cypress)

4. **Accessibility** ♿
   - Add ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

5. **Documentation** 📚
   - Add JSDoc comments
   - Create component documentation (Storybook)
   - API documentation
   - Update README

---

## 🔄 **Git Commit History Summary**

### Commit Timeline:
1. **6c6a04a** - Initial project setup dengan UI components
2. **b04857e** - Lytenyte Core implementation
3. **73ec973** - README & TODO documentation
4. **7f8b8bb** - Auth context & layout components
5. **77c3cc3** - Bottom navigation & main pages
6. **7054208** - Sub-menu pages (CorpComp, HumanCapital, etc.)
7. **817fedc** - Router configuration updates
8. **c838e00** - CSS animations & transitions

### Files Created/Modified:
- **Components**: 20+ UI components dari shadcn/ui
- **Layout**: 5 layout components (Header, Sidebar, etc.)
- **Pages**: 7 page components
- **Hooks**: 3 custom hooks
- **Contexts**: 1 auth context
- **Config**: Complete TypeScript, Vite, Tailwind setup

---

## 🎯 **Next Steps (Recommended Order)**

1. **Integrate useTransition** ke MainContentArea & Router
2. **Create loading components** (TransitionLoader, GlobalLoadingBar, Skeletons)
3. **Implement Dashboard** dengan real data & AnimatedStatsCard
4. **Build MobileOptimizedTable** component
5. **Implement Master Page** dengan full CRUD
6. **Complete sub-menu pages** (Human Capital, TAF, etc.)
7. **Mobile optimization** - zero padding, card views
8. **Settings & Profile** functionality
9. **Testing & Polish**
10. **Documentation update**

---

## 📌 **Notes**

- Project menggunakan **React 19** dengan **concurrent features** support
- **useTransition** hook sudah dibuat tapi belum diintegrasikan
- Layout & navigation structure sudah complete
- Authentication flow sudah working
- Semua pages masih **placeholder** - perlu implementasi konten real
- Focus pada **mobile-first** approach sesuai requirements
- Prioritaskan **smooth transitions** dengan useTransition di semua interactions

---

**Last Updated:** Based on commit `c838e00` (Dec 3, 2025)
