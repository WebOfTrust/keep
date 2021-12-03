# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['src/ward.py'],
             pathex=[],
             binaries=[],
             datas=[
                ('src/kiwi', 'ui')
             ],
             hiddenimports=[
                'falcon.app_helpers',
                'xml.etree',
                'falcon.responders',
                'falcon.routing',
                'falcon.request_helpers',
                'falcon.response_helpers',
                'falcon.forwarded',
                'falcon.media',
                'cgi',
                'falcon.vendor',
                'falcon.vendor.mimeparse'
             ],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)


pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)


exe = EXE(pyz,
          a.scripts, 
          [],
          exclude_binaries=True,
          name='ward',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None )


coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas, 
               strip=False,
               upx=True,
               upx_exclude=[],
               name='ward')
