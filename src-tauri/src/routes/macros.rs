/// Macro to create a function for a specific route.
#[macro_export]
macro_rules! route_fn {
    (
        $(#[$outer:meta])*
        $vis:vis fn $fn_name:ident($name:ident: $at:ty$(, $args:ident: $tys:ty)*) -> $rt:ty {
            $fetch_fn:ident($($add_args:expr)*);
            ($cache_fn:ident, $insert_fn:ident)
        }
    ) => {
        #[tauri::command]
        $(#[$outer])*
        /// # Errors
        ///
        /// This function will return an error if the request fails.
        $vis async fn $fn_name(
            client: tauri::State<'_, $crate::Client>,
            $name: $at,
            $($args: $tys)*
        ) -> Result<$rt, String> {
            let Some($name) = client.cache.read().await.$cache_fn($name) else {
                let result = client
                    .driver
                    .read()
                    .await
                    .$fetch_fn($name, $($add_args)*)
                    .await
                    .map_err(|err| format!("{err:?}"))?;

                *client.cache.write().await = client.cache.read().await.clone().$insert_fn(result.clone());

                return Ok(result);
            };

            Ok($name)
        }
    };
    (
        $(#[$outer:meta])*
        $vis:vis fn $fn_name:ident($name:ident: $at:ty$(, $args:ident: $tys:ty)*) -> $rt:ty {
            $fetch_fn:ident($($add_args:expr)*);
        }
    ) => {
        #[tauri::command]
        $(#[$outer])*
        /// # Errors
        ///
        /// This function will return an error if the request fails.
        $vis async fn $fn_name(
            client: tauri::State<'_, Client>,
            $name: $at,
            $($args: $tys)*
        ) -> Result<$rt, String> {
            client
                .driver
                .read()
                .await
                .$fetch_fn($name, $($add_args)*)
                .await
                .map_err(|err| format!("{err:?}"))
        }
    };
}

/// Macro to create a [`Cache`] implementation for a specific item.
#[macro_export]
macro_rules! cache_impl {
    ($ty:ty, $cache:ident, $contains_fn:ident, $insert_fn:ident, $insert_unchecked_fn:ident, $get_id:expr) => {
        impl $crate::Cache {
            /// Checks if the item exists in the cache.
            #[must_use]
            #[allow(clippy::redundant_closure_call)]
            pub fn $contains_fn(&self, item_id: &str) -> Option<$ty> {
                self.$cache
                    .iter()
                    .filter(|item| $get_id(item) == item_id)
                    .collect::<Vec<&$ty>>()
                    .get(0)
                    .copied()
                    .cloned()
            }

            /// Inserts an item into the cache if it doesn't exist.
            #[must_use]
            #[allow(clippy::redundant_closure_call)]
            pub fn $insert_fn(&mut self, item: $ty) -> Self {
                if self.$contains_fn(&$get_id(&&item)).is_none() {
                    unsafe { self.$insert_unchecked_fn(item) }
                } else {
                    self.clone()
                }
            }

            #[must_use]
            /// Inserts an item into the cache no matter what.
            ///
            /// # Safety
            ///
            /// This function should not be called if the caller is not sure if the item exists or not.
            pub unsafe fn $insert_unchecked_fn(&mut self, item: $ty) -> Self {
                self.$cache.push(item);
                self.clone()
            }
        }
    };
}
