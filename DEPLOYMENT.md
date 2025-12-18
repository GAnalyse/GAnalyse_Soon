# Deployment (ganalyse.com) — GitHub Actions → SSH

Repo: [`GAnalyse/GAnalyse_Soon`](https://github.com/GAnalyse/GAnalyse_Soon)

This project is a **Vite + React** static site. `npm run build` produces `dist/` which is deployed to the server and served by **Nginx**.

## 1) Server prerequisites (Ubuntu)

SSH into the server and run:

```bash
sudo apt update
sudo apt install -y nginx rsync
sudo mkdir -p /var/www/ganalyse.com/html
sudo chown -R www-data:www-data /var/www/ganalyse.com
```

### Nginx site

Copy `deploy/nginx/ganalyse.com.conf` to Nginx:

```bash
sudo cp deploy/nginx/ganalyse.com.conf /etc/nginx/sites-available/ganalyse.com.conf
sudo ln -s /etc/nginx/sites-available/ganalyse.com.conf /etc/nginx/sites-enabled/ganalyse.com.conf
sudo nginx -t
sudo systemctl reload nginx
```

> If you are copying from your local machine, just paste the contents of `deploy/nginx/ganalyse.com.conf`
> into `/etc/nginx/sites-available/ganalyse.com.conf` on the server.

## 2) DNS

Point DNS records to your server IP `157.180.27.88`:

- `A ganalyse.com → 157.180.27.88`
- `A www.ganalyse.com → 157.180.27.88`

Wait until DNS propagates.

## 3) Create a NEW deploy SSH key (recommended)

Generate a dedicated keypair (on your PC):

```bash
ssh-keygen -t ed25519 -C "github-actions@ganalyse.com" -f ganalyse_deploy_key
```

This creates:
- **private key**: `ganalyse_deploy_key`
- **public key**: `ganalyse_deploy_key.pub`

### Add public key to the server

Assuming you deploy as `root` (change user if needed):

```bash
ssh-copy-id -i ganalyse_deploy_key.pub root@157.180.27.88
```

If `ssh-copy-id` is not available, append manually:

```bash
cat ganalyse_deploy_key.pub
```

Then on the server:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 4) GitHub repo secrets

In GitHub: **Repo → Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

- **`SSH_HOST`**: `157.180.27.88`
- **`SSH_PORT`**: `22` (or your port)
- **`SSH_USER`**: `root` (or your user)
- **`SSH_PRIVATE_KEY`**: *paste the entire contents of* `ganalyse_deploy_key` (private key)
- **`DEPLOY_PATH`**: `/var/www/ganalyse.com/html`

## 5) First deploy

Push to `main` and the workflow `.github/workflows/deploy.yml` will:

- run `npm ci`
- run `npm run build`
- `rsync` `dist/` → `${DEPLOY_PATH}` over SSH

## 6) HTTPS (Let's Encrypt)

After DNS works:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ganalyse.com -d www.ganalyse.com
```

## 7) Verify

On server:

```bash
ls -la /var/www/ganalyse.com/html
```

In browser:
- `https://ganalyse.com`


